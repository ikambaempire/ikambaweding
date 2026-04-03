export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  createdAt: string;
}

const STORAGE_KEY = 'ikamba_media';
const ADMIN_PASS = 'ikamba2024';

export const verifyAdmin = (password: string): boolean => {
  return password === ADMIN_PASS;
};

export const getMedia = (type?: 'image' | 'video'): MediaItem[] => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return type ? data.filter((item: MediaItem) => item.type === type) : data;
  } catch {
    return [];
  }
};

export const addMedia = (item: Omit<MediaItem, 'id' | 'createdAt'>): MediaItem => {
  const media = getMedia();
  const newItem: MediaItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  media.unshift(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(media));
  return newItem;
};

export const removeMedia = (id: string): void => {
  const media = getMedia().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(media));
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
