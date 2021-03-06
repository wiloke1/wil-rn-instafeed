import createState from "../../utils/createState";
const initialState = {};
const { getState, setState, subscribe } = createState(initialState);
const handleOpenModal = (id, slotId, index) => {
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
const handleCloseModal = (slotId) => {
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
