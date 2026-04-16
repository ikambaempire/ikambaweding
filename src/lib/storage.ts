import { supabase } from "@/integrations/supabase/client";

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  category: string;
  folderId: string | null;
  createdAt: string;
}

export interface WeddingFolder {
  id: string;
  name: string;
  slug: string;
  coverImage: string | null;
  isPublic: boolean;
  accessCode: string | null;
  createdAt: string;
}

export interface BookingRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  weddingDate: string;
  package: string;
  venue: string | null;
  message: string | null;
  status: string;
  createdAt: string;
}

export interface Package {
  id: string;
  name: string;
  subtitle: string | null;
  price: string;
  features: string[];
  isPopular: boolean;
  isPublished: boolean;
  sortOrder: number;
}

export const CATEGORIES = [
  'Pre-shoot',
  'Introduction',
  'Church',
  'Reception',
  'Civil Wedding',
  'Engagement',
  'Traditional Ceremony',
  'Honeymoon',
] as const;

const ADMIN_PASS = 'ikamba2024';

export const verifyAdmin = (password: string): boolean => {
  return password === ADMIN_PASS;
};

// ---- Folders ----

export const getFolders = async (): Promise<WeddingFolder[]> => {
  const { data, error } = await supabase
    .from('wedding_folders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return (data || []).map((f: any) => ({
    id: f.id, name: f.name, slug: f.slug,
    coverImage: f.cover_image, isPublic: f.is_public,
    accessCode: f.access_code, createdAt: f.created_at,
  }));
};

export const createFolder = async (name: string, isPublic: boolean, accessCode?: string): Promise<WeddingFolder> => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const { data, error } = await supabase.from('wedding_folders').insert({
    name, slug, is_public: isPublic, access_code: accessCode || null,
  }).select().single();
  if (error) throw error;
  return { id: data.id, name: data.name, slug: data.slug, coverImage: data.cover_image, isPublic: data.is_public, accessCode: data.access_code, createdAt: data.created_at };
};

export const deleteFolder = async (id: string): Promise<void> => {
  await supabase.from('wedding_folders').delete().eq('id', id);
};

export const updateFolderCover = async (folderId: string, coverImage: string): Promise<void> => {
  await supabase.from('wedding_folders').update({ cover_image: coverImage }).eq('id', folderId);
};

// ---- Media ----

export const getMedia = async (type?: 'image' | 'video', folderId?: string, category?: string): Promise<MediaItem[]> => {
  let query = supabase.from('media').select('*').order('created_at', { ascending: false });
  if (type) query = query.eq('type', type);
  if (folderId) query = query.eq('folder_id', folderId);
  if (category) query = query.eq('category', category);

  const { data, error } = await query;
  if (error) { console.error(error); return []; }

  return (data || []).map((item: any) => {
    const { data: urlData } = supabase.storage.from('media').getPublicUrl(item.file_path);
    return {
      id: item.id, type: item.type as 'image' | 'video',
      title: item.title, category: item.category,
      folderId: item.folder_id, createdAt: item.created_at,
      url: urlData.publicUrl,
    };
  });
};

export const addMedia = async (file: File, type: 'image' | 'video', title: string, folderId?: string, category?: string): Promise<MediaItem> => {
  const ext = file.name.split('.').pop() || '';
  const filePath = `${type}s/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file, {
    cacheControl: '3600', upsert: false,
  });
  if (uploadError) throw uploadError;

  const { data, error: insertError } = await supabase.from('media').insert({
    type, title, file_path: filePath,
    folder_id: folderId || null,
    category: category || 'uncategorized',
  }).select().single();
  if (insertError) throw insertError;

  const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
  return {
    id: data.id, type: data.type as 'image' | 'video',
    title: data.title, category: data.category,
    folderId: data.folder_id, createdAt: data.created_at,
    url: urlData.publicUrl,
  };
};

export const removeMedia = async (id: string): Promise<void> => {
  const { data } = await supabase.from('media').select('file_path').eq('id', id).single();
  if (data) {
    await supabase.storage.from('media').remove([data.file_path]);
  }
  await supabase.from('media').delete().eq('id', id);
};

// ---- Bookings ----

export const createBooking = async (booking: Omit<BookingRequest, 'id' | 'status' | 'createdAt'>): Promise<void> => {
  const { error } = await supabase.from('bookings').insert({
    client_name: booking.clientName,
    client_email: booking.clientEmail,
    client_phone: booking.clientPhone,
    wedding_date: booking.weddingDate,
    package: booking.package,
    venue: booking.venue,
    message: booking.message,
  });
  if (error) throw error;
};

export const getBookings = async (): Promise<BookingRequest[]> => {
  const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return (data || []).map((b: any) => ({
    id: b.id, clientName: b.client_name, clientEmail: b.client_email,
    clientPhone: b.client_phone, weddingDate: b.wedding_date,
    package: b.package, venue: b.venue, message: b.message,
    status: b.status, createdAt: b.created_at,
  }));
};

export const updateBookingStatus = async (id: string, status: string): Promise<void> => {
  await supabase.from('bookings').update({ status }).eq('id', id);
};

// ---- Packages ----

const mapPackage = (p: any): Package => ({
  id: p.id, name: p.name, subtitle: p.subtitle, price: p.price,
  features: p.features || [], isPopular: p.is_popular,
  isPublished: p.is_published, sortOrder: p.sort_order,
});

export const getPackages = async (publishedOnly = false): Promise<Package[]> => {
  let q = supabase.from('packages').select('*').order('sort_order', { ascending: true });
  if (publishedOnly) q = q.eq('is_published', true);
  const { data, error } = await q;
  if (error) { console.error(error); return []; }
  return (data || []).map(mapPackage);
};

export const createPackage = async (p: Omit<Package, 'id'>): Promise<void> => {
  const { error } = await supabase.from('packages').insert({
    name: p.name, subtitle: p.subtitle, price: p.price, features: p.features,
    is_popular: p.isPopular, is_published: p.isPublished, sort_order: p.sortOrder,
  });
  if (error) throw error;
};

export const updatePackage = async (id: string, p: Partial<Package>): Promise<void> => {
  const payload: any = { updated_at: new Date().toISOString() };
  if (p.name !== undefined) payload.name = p.name;
  if (p.subtitle !== undefined) payload.subtitle = p.subtitle;
  if (p.price !== undefined) payload.price = p.price;
  if (p.features !== undefined) payload.features = p.features;
  if (p.isPopular !== undefined) payload.is_popular = p.isPopular;
  if (p.isPublished !== undefined) payload.is_published = p.isPublished;
  if (p.sortOrder !== undefined) payload.sort_order = p.sortOrder;
  const { error } = await supabase.from('packages').update(payload).eq('id', id);
  if (error) throw error;
};

export const deletePackage = async (id: string): Promise<void> => {
  await supabase.from('packages').delete().eq('id', id);
};

// ---- Media category update ----
export const updateMediaCategory = async (id: string, category: string, folderId?: string): Promise<void> => {
  const payload: any = { category };
  if (folderId !== undefined) payload.folder_id = folderId;
  const { error } = await supabase.from('media').update(payload).eq('id', id);
  if (error) throw error;
};
