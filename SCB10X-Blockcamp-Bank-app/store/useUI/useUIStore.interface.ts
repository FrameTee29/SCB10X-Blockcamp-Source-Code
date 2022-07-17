export enum DrawerViews {
  SIDEBAR = "sidebar",
}

export enum ModalViews {
  CREATE_BANK_ACCOUNT = "create bank account",
}

interface IInitialStore {
  displayDrawer: boolean;
  displayModal: boolean;
  drawerView: DrawerViews;
  modalView: ModalViews;
}

export interface IUseUIStore extends IInitialStore {
  openDrawer: () => void;
  closeDrawer: () => void;
  setDrawerView: (view: DrawerViews) => void;
  openModal: () => void;
  closeModal: () => void;
  setModalView: (view: ModalViews) => void;
}
