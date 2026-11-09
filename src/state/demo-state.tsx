import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';

const STORAGE_KEY = 'localbrand-demo:v1';
type SavedState = { savedIds: string[]; followedIds: string[] };
type DemoState = SavedState & {
  hydrated: boolean;
  storageError: boolean;
  toggleSaved(id: string): void;
  toggleFollowed(id: string): void;
};
const DemoContext = createContext<DemoState | null>(null);
const empty: SavedState = { savedIds: [], followedIds: [] };
function parseState(raw: string | null): SavedState {
  if (!raw) return empty;
  const value: unknown = JSON.parse(raw);
  if (!value || typeof value !== 'object') return empty;
  const state = value as Record<string, unknown>;
  const strings = (items: unknown): string[] =>
    Array.isArray(items)
      ? [...new Set(items.filter((id): id is string => typeof id === 'string'))]
      : [];
  return { savedIds: strings(state.savedIds), followedIds: strings(state.followedIds) };
}
export function DemoProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<SavedState>(empty);
  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState(false);
  // Tuần tự hóa lần ghi để thao tác nhanh không ghi đè bằng trạng thái cũ.
  const writes = useRef(Promise.resolve());
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (active) setState(parseState(raw));
      })
      .catch(() => {
        if (active) setStorageError(true);
      })
      .finally(() => {
        if (active) setHydrated(true);
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    writes.current = writes.current
      .then(() => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)))
      .catch(() => {
        setStorageError(true);
      });
  }, [hydrated, state]);
  function toggle(key: keyof SavedState, id: string) {
    if (!hydrated) return;
    setState((current) => ({
      ...current,
      [key]: current[key].includes(id)
        ? current[key].filter((item) => item !== id)
        : [...current[key], id],
    }));
  }
  return (
    <DemoContext.Provider
      value={{
        ...state,
        hydrated,
        storageError,
        toggleSaved: (id) => toggle('savedIds', id),
        toggleFollowed: (id) => toggle('followedIds', id),
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}
export function useDemoState() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemoState cần nằm trong DemoProvider');
  return context;
}
