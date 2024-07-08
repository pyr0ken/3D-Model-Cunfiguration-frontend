import { create } from "zustand";

const useModelsStore = create((set) => ({
  models: [],
  selectedModel: null,
  saveSelectedModel: (data) => set((state) => ({ selectedModel: data })),
  addModel: (model) => set((state) => ({ models: [...state.models, model] })),
  removeModel: (modelId) =>
    set((state) => ({
      models: state.models.filter((model) => model.id !== modelId),
    })),
  updateModel: (modelId, newModel) =>
    set((state) => ({
      models: state.models.map((model) =>
        model.id === modelId ? newModel : model,
      ),
    })),
  clearModels: () => set({ models: [] }),
  getModel: (modelId) => {
    const model = state.models.find((model) => model.id === modelId);
    return model;
  },
}));

export default useModelsStore;
