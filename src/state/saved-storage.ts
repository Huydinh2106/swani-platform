export const SAVED_STATE_STORAGE_KEY = 'swani:v1';
// Chỉ đọc khóa cũ để giữ dữ liệu đã lưu/theo dõi sau khi đổi tên app.
const LEGACY_STORAGE_KEY = 'localbrand-demo:v1';

type StorageReader = { getItem(key: string): Promise<string | null> };

export async function readSavedState(storage: StorageReader): Promise<string | null> {
  const current = await storage.getItem(SAVED_STATE_STORAGE_KEY);
  return current ?? storage.getItem(LEGACY_STORAGE_KEY);
}
