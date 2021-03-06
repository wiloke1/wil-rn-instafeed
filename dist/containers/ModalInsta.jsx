import React from 'react';
import { Modal, StatusBar } from 'react-native';
import useSelector from "../utils/useSelector";
import InstaContent from './InstaContent';
import modalStore from './store/modalStore';
const ModalInsta = ({ instaSection, setting, slotId }) => {
    const modalSelect = useSelector(modalStore);
    return (<Modal visible={!!modalSelect[slotId]?.isVisible} animationType="slide" transparent>
      <StatusBar hidden/>
      <InstaContent instaSection={instaSection} setting={setting} slotId={slotId}/>
    </Modal>);
};
export default ModalInsta;
