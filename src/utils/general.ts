import { AppStore } from 'containers/store/appStore';
import { Setting } from 'types';

export const getColumn = (setting: Setting): number => {
  return setting.number_of_columns_mobile || setting.number_of_columns_tablet || setting.number_of_columns_desktop;
};

export const getRow = (setting: Setting): number => {
  return setting.number_of_rows_mobile || setting.number_of_rows_tablet || setting.number_of_rows_desktop;
};

export const getGap = (setting: Setting): number => {
  return setting.gap_mobile || setting.gap_tablet || setting.gap_desktop;
};

export const getInstaData = (instaSection: AppStore[0], row: number, column: number) => {
  if (!instaSection.posts) {
    return [];
  }
  const len = instaSection.posts.length;
  return instaSection.posts.filter((_post, index) => index >= 0 && index < Math.min(row * column, len));
};
