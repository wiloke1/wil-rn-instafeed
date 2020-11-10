import createState from 'utils/createState';

export interface ModalStore {
  [slotId: string]: {
    isVisible: boolean;
    isVisibleDone: boolean;
    idActive: string;
    indexActive: number;
  };
}

const initialState: ModalStore = {};

const { getState, setState, subscribe } = createState(initialState);

const handleOpenModal = (id: string, slotId: string, index: number) => {
  setState(state => ({
    ...state,
    [slotId]: {
      ...state[slotId],
      isVisible: true,
      idActive: id,
      indexActive: index,
    },
  }))('handleOpenModal');
};

const handleCloseModal = (slotId: string) => {
  setState(state => ({
    ...state,
    [slotId]: {
      ...state[slotId],
      isVisible: false,
      idActive: '',
      indexActive: 0,
    },
  }))('handleCloseModal');
};

const modalStore = {
  getState,
  subscribe,
  handleOpenModal,
  handleCloseModal,
};

export default modalStore;
