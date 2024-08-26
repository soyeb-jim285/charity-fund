import { create } from "zustand";

type NewFund = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewFund = create<NewFund>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
