import React from 'react';
import { Modal, StatusBar } from 'react-native';
import useSelector from "../utils/useSelector";
import ModalInstaContent from './ModalInstaContent';
import modalStore from './store/modalStore';
var ModalInsta = function (_a) {
    var instaSection = _a.instaSection, setting = _a.setting;
    var modalSelect = useSelector(modalStore);
    return (React.createElement(Modal, { visible: modalSelect.isVisible, animationType: "slide", onShow: modalStore.handleOpenModalDone, onDismiss: modalStore.handleCloseModalDone, transparent: true },
        React.createElement(StatusBar, { hidden: true }),
        React.createElement(ModalInstaContent, { instaSection: instaSection, setting: setting })));
};
export default ModalInsta;
