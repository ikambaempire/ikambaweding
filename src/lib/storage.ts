export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string; // blob URL (runtime only)
  title: string;
  createdAt: string;
}

interface StoredMedia {
  id: string;
  type: 'image' | 'video';
  title: string;
  createdAt: string;
  blob: Blob;
}

const DB_NAME = 'ikamba_db';
const STORE_NAME = 'media';
const DB_VERSION = 1;
const ADMIN_PASS = 'ikamba2024';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const verifyAdmin = (password: string): boolean => {
  return password === ADMIN_PASS;
};

export const getMedia = async (type?: 'image' | 'video'): Promise<MediaItem[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => {
      const items: StoredMedia[] = request.result;
      const mapped = items
        .filter((item) => !type || item.type === type)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((item) => ({
          id: item.id,
          type: item.type,
          title: item.title,
          createdAt: item.createdAt,
          url: URL.createObjectURL(item.blob),
        }));
      resolve(mapped);
    };
    request.onerror = () => reject(request.error);
  });
};

export const addMedia = async (file: File, type: 'image' | 'video', title: string): Promise<MediaItem> => {
  const db = await openDB();
  const stored: StoredMedia = {
    id: crypto.randomUUID(),
    type,
    title,
    createdAt: new Date().toISOString(),
    blob: file,
  };
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(stored);
    request.onsuccess = () => {
      resolve({
        id: stored.id,
        type: stored.type,
        title: stored.title,
        createdAt: stored.createdAt,
        url: URL.createObjectURL(stored.blob),
      });
    };
    request.onerror = () => reject(request.error);
  });
};

export const removeMedia = async (id: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
