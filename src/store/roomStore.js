import { create } from "zustand";

const useRoomStore = create((set) => ({
  roomTitle: null,
  roomId: null,
  authToken: null,
  meetingId: null,
  isOwner: false,
  ownerId: null,
  joined: false,
  selectedModel: null,
  closeModel: false,
  isRoomModalOpen: false,
  aiCameraIsOn: false,
  aiRotation: { x: 0, y: 0 },
  reloadModelKey: 0,
  setRoomTitle: (data) => set((state) => ({ roomTitle: data })),
  setRoomId: (data) => set((state) => ({ roomId: data })),
  setAuthToken: (data) => set((state) => ({ authToken: data })),
  setMeetingId: (data) => set((state) => ({ meetingId: data })),
  setJoined: (data) => set((state) => ({ joined: data })),
  setIsOwner: (data) => set((state) => ({ isOwner: data })),
  setOwnerId: (data) => set((state) => ({ ownerId: data })),
  setSelectedModel: (data) => set((state) => ({ selectedModel: data })),
  setCloseModel: (data) => set((state) => ({ closeModel: data })),
  setIsRoomModalOpen: (status) => set((state) => ({ isRoomModalOpen: status })),
  setAiRotation: ({ x, y }) => set((state) => ({ aiRotation: { x, y } })),
  changeAiCameraStatus: () => set((state) => ({ aiCameraIsOn: !state.aiCameraIsOn })),
  changeReloadModelKey: () =>
    set((state) => ({ reloadModelKey: state.reloadModelKey + 1 })),
}));

export default useRoomStore;
