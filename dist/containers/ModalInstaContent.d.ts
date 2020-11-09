import { FC } from 'react';
import { Setting } from "../types";
import { AppStore } from './store/appStore';
export interface ModalInstaContentProps {
    instaSection: AppStore[0];
    setting: Setting;
}
declare const ModalInstaContent: FC<ModalInstaContentProps>;
export default ModalInstaContent;
