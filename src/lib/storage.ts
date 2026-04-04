import { supabase } from "@/integrations/supabase/client";

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  createdAt: string;
}

const ADMIN_PASS = 'ikamba2024';

export const verifyAdmin = (password: string): boolean => {
  return password === ADMIN_PASS;
};

export const getMedia = async (type?: 'image' | 'video'): Promise<MediaItem[]> => {
  let query = supabase.from('media').select('*').order('created_at', { ascending: false });
  if (type) query = query.eq('type', type);

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching media:', error);
    return [];
  }

  return (data || []).map((item: any) => {
    const { data: urlData } = supabase.storage.from('media').getPublicUrl(item.file_path);
    return {
      id: item.id,
      type: item.type as 'image' | 'video',
      title: item.title,
      createdAt: item.created_at,
      url: urlData.publicUrl,
    };
  });
};

export const addMedia = async (file: File, type: 'image' | 'video', title: string): Promise<MediaItem> => {
  const ext = file.name.split('.').pop() || '';
  const filePath = `${type}s/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (uploadError) throw uploadError;

  const { data, error: insertError } = await supabase.from('media').insert({
    type,
    title,
    file_path: filePath,
  }).select().single();

  if (insertError) throw insertError;

  const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);

  return {
    id: data.id,
    type: data.type as 'image' | 'video',
    title: data.title,
    createdAt: data.created_at,
    url: urlData.publicUrl,
  };
};

export const removeMedia = async (id: string): Promise<void> => {
  // Get file path first
  const { data } = await supabase.from('media').select('file_path').eq('id', id).single();
  if (data) {
    await supabase.storage.from('media').remove([data.file_path]);
  }
  await supabase.from('media').delete().eq('id', id);
};
