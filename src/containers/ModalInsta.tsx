import React, { FC } from 'react';
import { Modal, StatusBar } from 'react-native';
import useSelector from 'utils/useSelector';
import ModalInstaContent, { ModalInstaContentProps } from './ModalInstaContent';
import modalStore from './store/modalStore';

export interface ModalInstaProps extends ModalInstaContentProps {
  slotId: string;
}

const ModalInsta: FC<ModalInstaProps> = ({ instaSection, setting, slotId }) => {
  const modalSelect = useSelector(modalStore);

  return (
    <Modal visible={!!modalSelect[slotId]?.isVisible} animationType="slide" transparent>
      <StatusBar hidden />
      <ModalInstaContent instaSection={instaSection} setting={setting} slotId={slotId} />
    </Modal>
  );
};

export default ModalInsta;
