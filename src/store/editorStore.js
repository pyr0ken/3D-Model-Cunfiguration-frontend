import { create } from "zustand";

const useEditorStore = create((set) => ({
  editModels: [],
  isEditModalOpen: false,
  selectedModel: null,
  closeModel: false,
  aiCameraIsOn: false,
  aiRotation: { x: 0, y: 0 },
  reloadModelKey: 0,
  setIsEditModalOpen: (status) => set((state) => ({ isEditModalOpen: status })),
  setSelectedModel: (data) => set((state) => ({ selectedModel: data })),
  setCloseModel: (data) => set((state) => ({ closeModel: data })),
  addEditModel: (editModel) =>
    set((state) => ({ editModels: [...state.editModels, editModel] })),
  removeEditModel: (editModelId) =>
    set((state) => ({
      editModels: state.editModels.filter(
        (editModel) => editModel.id !== editModelId,
      ),
    })),
  setAiCameraIsOn: (data) => set((state) => ({ aiCameraIsOn: data })),
  setAiRotation: ({ x, y }) => set((state) => ({ aiRotation: { x, y } })),
  changeReloadModelKey: () =>
    set((state) => ({ reloadModelKey: state.reloadModelKey + 1 })),
}));

export default useEditorStore;
