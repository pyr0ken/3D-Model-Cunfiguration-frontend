import { create } from "zustand";

const useChatStore = create((set) => ({
  messages: [],
  setMessages: (data) => set((state) => ({ messages: data })),
  addMsg: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  removeMsg: (index) =>
    set((state) => ({
      messages: state.messages.filter((_, i) => i !== index),
    })),
  updateMsg: (index, newMsg) =>
    set((state) => ({
      messages: state.messages.map((msg, i) => (i === index ? newMsg : msg)),
    })),
  clearMsgs: () => set({ messages: [] }),
}));

export default useChatStore;
