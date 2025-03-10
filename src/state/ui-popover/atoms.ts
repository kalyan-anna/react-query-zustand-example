import create from 'zustand';

interface NotificationPopoverState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useNotificationPopoverStore = create<NotificationPopoverState>(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({ isOpen }),
}));
