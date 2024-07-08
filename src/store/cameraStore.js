import { create } from "zustand";

const useCameraStore = create((set) => ({
  cameraIsOn: false,
  changeCameraStatus: () => set((state) => ({ cameraIsOn: !state.cameraIsOn })),
}));

export default useCameraStore;
