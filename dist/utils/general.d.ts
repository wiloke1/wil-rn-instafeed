import { AppStore } from "../containers/store/appStore";
import { Setting } from "../types";
export declare const getColumn: (setting: Setting) => number;
export declare const getRow: (setting: Setting) => number;
export declare const getGap: (setting: Setting) => number;
export declare const getInstaData: (instaSection: AppStore[0], row: number, column: number) => import("../api/Instagram").InstaItem[];
