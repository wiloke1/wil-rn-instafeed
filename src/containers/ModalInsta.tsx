import React, { FC } from 'react';
import { Modal, StatusBar } from 'react-native';
import useSelector from 'utils/useSelector';
import ModalInstaContent, { ModalInstaContentProps } from './ModalInstaContent';
import modalStore from './store/modalStore';

export interface ModalInstaProps extends ModalInstaContentProps {}

const ModalInsta: FC<ModalInstaProps> = ({ instaSection, setting }) => {
  const modalSelect = useSelector(modalStore);

  return (
    <Modal
      visible={modalSelect.isVisible}
      animationType="slide"
      onShow={modalStore.handleOpenModalDone}
      onDismiss={modalStore.handleCloseModalDone}
      transparent
    >
      <StatusBar hidden />
      <ModalInstaContent instaSection={instaSection} setting={setting} />
    </Modal>
  );
};

export default ModalInsta;
