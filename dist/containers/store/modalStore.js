var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import createState from "../../utils/createState";
var initialState = {
    isVisible: false,
    isVisibleDone: false,
    idActive: '',
    indexActive: 0,
};
var _a = createState(initialState), getState = _a.getState, setState = _a.setState, subscribe = _a.subscribe;
var handleOpenModal = function (id, index) {
    setState({
        isVisible: true,
        idActive: id,
        indexActive: index,
    })('handleOpenModal');
};
var handleCloseModal = function () {
    setState({
        isVisible: false,
        idActive: '',
        indexActive: 0,
    })('handleCloseModal');
};
var handleOpenModalDone = function () {
    setState(function (state) { return (__assign(__assign({}, state), { isVisibleDone: true })); })('handleOpenModalDone');
};
var handleCloseModalDone = function () {
    setState(function (state) { return (__assign(__assign({}, state), { isVisibleDone: false })); })('handleCloseModalDone');
};
var setIndexActive = function (index) {
    setState(function (state) { return (__assign(__assign({}, state), { indexActive: index })); })('setIndexActive');
};
var modalStore = {
    getState: getState,
    subscribe: subscribe,
    handleOpenModal: handleOpenModal,
    handleCloseModal: handleCloseModal,
    handleOpenModalDone: handleOpenModalDone,
    handleCloseModalDone: handleCloseModalDone,
    setIndexActive: setIndexActive,
};
export default modalStore;
