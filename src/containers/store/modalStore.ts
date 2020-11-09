import createState from 'utils/createState';

export interface ModalStore {
  isVisible: boolean;
  isVisibleDone: boolean;
  idActive: string;
  indexActive: number;
}

const initialState: ModalStore = {
  isVisible: false,
  isVisibleDone: false,
  idActive: '',
  indexActive: 0,
};

const { getState, setState, subscribe } = createState(initialState);

const handleOpenModal = (id: string, index: number) => {
  setState({
    isVisible: true,
    idActive: id,
    indexActive: index,
  })('handleOpenModal');
};

const handleCloseModal = () => {
  setState({
    isVisible: false,
    idActive: '',
    indexActive: 0,
  })('handleCloseModal');
};

const handleOpenModalDone = () => {
  setState(state => ({
    ...state,
    isVisibleDone: true,
  }))('handleOpenModalDone');
};

const handleCloseModalDone = () => {
  setState(state => ({
    ...state,
    isVisibleDone: false,
  }))('handleCloseModalDone');
};

const setIndexActive = (index: number) => {
  setState(state => ({
    ...state,
    indexActive: index,
  }))('setIndexActive');
};

const modalStore = {
  getState,
  subscribe,
  handleOpenModal,
  handleCloseModal,
  handleOpenModalDone,
  handleCloseModalDone,
  setIndexActive,
};

export default modalStore;
