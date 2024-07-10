import { create } from "zustand";

const useEditorStore = create((set) => ({
  isEditModalOpen: false,
  selectedModel: null,
  closeModel: false,
  aiCameraIsOn: false,
  aiRotation: { x: 0, y: 0 },
  setIsEditModalOpen: (status) => set((state) => ({ isEditModalOpen: status })),
  setSelectedModel: (data) => set((state) => ({ selectedModel: data })),
  setCloseModel: (data) => set((state) => ({ closeModel: data })),
  changeCameraStatus: () => set((state) => ({ aiCameraIsOn: !state.aiCameraIsOn })),
  setAiRotation: ({ x, y }) => set((state) => ({ rotation: { x, y } })),
  clearAiRotation: () => set((state) => ({ rotation: { x: 0, y: 0 } })),
}));

export default useEditorStore;
