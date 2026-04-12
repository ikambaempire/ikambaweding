import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { eventType, style, names, eventDate, location, customMessage, uploadedImageUrls, userIdentifier } = await req.json();

    if (!eventType || !style || !uploadedImageUrls?.length || !userIdentifier) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check credits
    const { data: creditData } = await supabase
      .from("user_credits")
      .select("credits")
      .eq("user_identifier", userIdentifier)
      .single();

    if (!creditData || creditData.credits < 1) {
      return new Response(JSON.stringify({ error: "Insufficient credits" }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build dynamic prompt
    const styleDesc = style === "custom" ? "elegant" : style;
    const textDetails = [
      names ? `names: "${names}"` : "",
      eventDate ? `date: "${eventDate}"` : "",
      location ? `location: "${location}"` : "",
      customMessage ? `message: "${customMessage}"` : "",
    ].filter(Boolean).join(", ");

    const prompt = `Create a hyper-realistic ${styleDesc} ${eventType} invitation design. Add elegant, professional typography with ${textDetails || "beautiful decorative text"}. Use cinematic lighting, depth of field, soft shadows, premium textures, and ultra high detail. Professional photography style, 4K quality. The design should look like it was created by a top wedding stationery designer. Include decorative borders, elegant fonts, and a luxurious feel.`;

    // Build messages with uploaded images
    const imageContents = uploadedImageUrls.map((url: string) => ({
      type: "image_url",
      image_url: { url },
    }));

    const generatedImages: string[] = [];

    // Generate 2 variations
    for (let i = 0; i < 2; i++) {
      const variationPrompt = i === 0
        ? prompt
        : `${prompt} Create a different layout variation with alternative typography and composition.`;

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-pro-image-preview",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: variationPrompt },
                ...imageContents,
              ],
            },
          ],
          modalities: ["image", "text"],
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          return new Response(JSON.stringify({ error: "Rate limited, please try again later." }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        if (response.status === 402) {
          return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const errText = await response.text();
        console.error("AI error:", response.status, errText);
        continue;
      }

      const data = await response.json();
      const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

      if (imageUrl) {
        // Upload to storage
        const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
        const bytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
        const filePath = `generated/${userIdentifier}/${crypto.randomUUID()}.png`;

        const { error: uploadErr } = await supabase.storage
          .from("invitations")
          .upload(filePath, bytes, { contentType: "image/png", upsert: false });

        if (!uploadErr) {
          const { data: urlData } = supabase.storage.from("invitations").getPublicUrl(filePath);
          generatedImages.push(urlData.publicUrl);
        } else {
          console.error("Upload error:", uploadErr);
        }
      }
    }

    if (generatedImages.length === 0) {
      return new Response(JSON.stringify({ error: "Failed to generate designs. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Deduct credit
    await supabase
      .from("user_credits")
      .update({ credits: creditData.credits - 1, updated_at: new Date().toISOString() })
      .eq("user_identifier", userIdentifier);

    // Save designs
    for (const imgUrl of generatedImages) {
      await supabase.from("generated_designs").insert({
        user_identifier: userIdentifier,
        event_type: eventType,
        style,
        names,
        event_date: eventDate,
        location,
        custom_message: customMessage,
        uploaded_images: uploadedImageUrls,
        generated_image_url: imgUrl,
        prompt_used: prompt,
      });
    }

    return new Response(JSON.stringify({
      images: generatedImages,
      remainingCredits: creditData.credits - 1,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
