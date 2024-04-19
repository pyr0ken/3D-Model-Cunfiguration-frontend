import { create } from "zustand";

const usePointsStore = create((set) => ({
  points: [],
  addPoint: (point) => set((state) => ({ points: [...state.points, point] })),
  removePoint: (index) =>
    set((state) => ({ points: state.points.filter((_, i) => i !== index) })),
  updatePoint: (index, newPoint) =>
    set((state) => ({
      points: state.points.map((point, i) => (i === index ? newPoint : point)),
    })),
  clearPoints: () => set({ points: [] }),
}));

export default usePointsStore;
