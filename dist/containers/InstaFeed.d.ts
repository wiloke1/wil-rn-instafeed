import { FC } from 'react';
import { Settings } from "../types";
export interface InstaFeedProps {
    /**
     * Insta feed settings
     */
    settings?: Settings;
    /**
     * chỗ đặt instagram
     */
    slotId: string;
    /**
     * container width
     */
    containerWidth: number;
}
declare const InstaFeed: FC<InstaFeedProps>;
export default InstaFeed;
