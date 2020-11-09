export interface ModalStore {
    isVisible: boolean;
    isVisibleDone: boolean;
    idActive: string;
    indexActive: number;
}
declare const modalStore: {
    getState: () => ModalStore;
    subscribe: (listener: (state: ModalStore) => void) => () => void;
    handleOpenModal: (id: string, index: number) => void;
    handleCloseModal: () => void;
    handleOpenModalDone: () => void;
    handleCloseModalDone: () => void;
    setIndexActive: (index: number) => void;
};
export default modalStore;
