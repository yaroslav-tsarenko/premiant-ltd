import { create } from 'zustand';

interface PopupState {
    showPopup: boolean;
    setShowPopup: (show: boolean) => void;
}

export const usePopupStore = create<PopupState>((set) => ({
    showPopup: false,
    setShowPopup: (show: boolean) => set({ showPopup: show }),
}));