import { create } from 'zustand';

interface UIState {
  sideDrawerOpen: boolean;

  openSideDrawer: () => void;

  closeSideDrawer: () => void;

  toggleSideDrawer: () => void;
}

export const useUIStore = create<UIState>(
  set => ({
    sideDrawerOpen: false,

    openSideDrawer: () =>
      set({
        sideDrawerOpen: true,
      }),

    closeSideDrawer: () =>
      set({
        sideDrawerOpen: false,
      }),

    toggleSideDrawer: () =>
      set(state => ({
        sideDrawerOpen:
          !state.sideDrawerOpen,
      })),
  }),
);