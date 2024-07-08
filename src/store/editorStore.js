import { create } from "zustand";

const useEditorStore = create((set) => ({
  isEditModalOpen: false,
  selectedModel: null,
  closeModel: false,
  setIsEditModalOpen: (status) => set((state) => ({ isEditModalOpen: status })),
  setSelectedModel: (data) => set((state) => ({ selectedModel: data })),
  setCloseModel: (data) => set((state) => ({ closeModel: data })),
}));

export default useEditorStore;
