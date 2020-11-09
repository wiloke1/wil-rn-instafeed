import { FC } from 'react';
import { Settings } from "../types";
export interface InstaFeedProps {
    /**
     * Insta feed settings
     */
    settings?: Settings;
    /**
     * Instagram username
     */
    username: string;
}
declare const InstaFeed: FC<InstaFeedProps>;
export default InstaFeed;
