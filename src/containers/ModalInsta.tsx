import React, { FC } from 'react';
import { Modal, StatusBar } from 'react-native';
import useSelector from 'utils/useSelector';
import InstaContent, { InstaContentProps } from './InstaContent';
import modalStore from './store/modalStore';

export interface ModalInstaProps extends InstaContentProps {
  slotId: string;
}

const ModalInsta: FC<ModalInstaProps> = ({ instaSection, setting, slotId }) => {
  const modalSelect = useSelector(modalStore);

  return (
    <Modal visible={!!modalSelect[slotId]?.isVisible} animationType="slide" transparent>
      <StatusBar hidden />
      <InstaContent instaSection={instaSection} setting={setting} slotId={slotId} />
    </Modal>
  );
};

export default ModalInsta;
