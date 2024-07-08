import { create } from "zustand";

const useRoomModalStore = create((set) => ({
  isModalOpen: false,
  setIsModalOpen: (status) => set((state) => ({ isModalOpen: status })),
}));

export default useRoomModalStore;
