import React from 'react';
import { Setting } from "../types";
import { AppStore } from './store/appStore';
export interface ModalInstaContentProps {
    instaSection: AppStore[0];
    setting: Setting;
    slotId: string;
}
declare const _default: React.NamedExoticComponent<ModalInstaContentProps>;
export default _default;
