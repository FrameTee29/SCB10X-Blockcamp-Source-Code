import create, { GetState, SetState } from "zustand";

import { DrawerViews, IUseUIStore, ModalViews } from "./useUIStore.interface";

const initialStore = {
  displayDrawer: false,
  displayModal: false,
  drawerView: DrawerViews.SIDEBAR,
  modalView: ModalViews.CREATE_BANK_ACCOUNT,
};

const useUIStore = create<IUseUIStore>(
  (set: SetState<IUseUIStore>, get: GetState<IUseUIStore>) => ({
    ...initialStore,
    openDrawer: () => {
      set({ displayDrawer: true });
    },
    closeDrawer: () => {
      set({ displayDrawer: false });
    },
    setDrawerView: (view: DrawerViews) => {
      set({ drawerView: view });
    },
    openModal: () => {
      set({ displayModal: true });
    },
    closeModal: () => {
      set({ displayModal: false });
    },
    setModalView: (view: ModalViews) => {
      set({ modalView: view });
    },
  })
);

export default useUIStore;
