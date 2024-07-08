import { create } from "zustand";

const useAiStore = create((set) => ({
  rotation: { x: 0, y: 0 },
  saveRotation: ({ x, y }) => set((state) => ({ rotation: { x, y } })),
  removeRotation: () => set((state) => ({ rotation: { x: 0, y: 0 } })),
}));

export default useAiStore;
