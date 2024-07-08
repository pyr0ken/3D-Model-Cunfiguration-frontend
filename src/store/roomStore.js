import { create } from "zustand";

const useRoomStore = create((set) => ({
  roomId: null,
  authToken: null,
  meetingId: null,
  isOwner: false,
  ownerId: null,
  joined: false,
  selectedModel: null,
  closeModel: false,
  isRoomModalOpen: false,
  setRoomId: (data) => set((state) => ({ roomId: data })),
  setAuthToken: (data) => set((state) => ({ authToken: data })),
  setMeetingId: (data) => set((state) => ({ meetingId: data })),
  setJoined: (data) => set((state) => ({ joined: data })),
  setIsOwner: (data) => set((state) => ({ isOwner: data })),
  setOwnerId: (data) => set((state) => ({ ownerId: data })),
  setSelectedModel: (data) => set((state) => ({ selectedModel: data })),
  setCloseModel: (data) => set((state) => ({ closeModel: data })),
  setIsRoomModalOpen: (status) => set((state) => ({ isRoomModalOpen: status })),
}));

export default useRoomStore;
