import { FC } from 'react';
import { ModalInstaContentProps } from './ModalInstaContent';
export interface ModalInstaProps extends ModalInstaContentProps {
    slotId: string;
}
declare const ModalInsta: FC<ModalInstaProps>;
export default ModalInsta;
