import { AppStore } from 'containers/store/appStore';
import { Setting } from 'types';

export const getColumn = (setting?: Setting): number => {
  if (!setting) {
    return 0;
  }
  return setting.number_of_columns_mobile || setting.number_of_columns_tablet || setting.number_of_columns_desktop;
};

export const getRow = (setting?: Setting): number => {
  if (!setting) {
    return 0;
  }
  return setting.number_of_rows_mobile || setting.number_of_rows_tablet || setting.number_of_rows_desktop;
};

export const getGap = (setting?: Setting): number => {
  if (!setting) {
    return 0;
  }
  return setting.gap_mobile || setting.gap_tablet || setting.gap_desktop;
};

export const getInstaGridData = (instaSection: AppStore[0], row: number, column: number) => {
  if (!instaSection.posts) {
    return [];
  }
  const len = instaSection.posts.length;
  return instaSection.posts.filter((_post, index) => index >= 0 && index < Math.min(row * column, len));
};

export type ItemReturnType<T> = T & {
  index: number;
};

export function splitCarouselData<T>(data: T[], numCol: number, numRow: number): ItemReturnType<T>[][] {
  if (data.length === 0) {
    return [];
  }
  const newData = data.map<ItemReturnType<T>>((item, index) => ({ ...item, index }));
  const itemsInScreen = numCol * numRow;
  let pageTotal = data.length / itemsInScreen;
  pageTotal = data.length % itemsInScreen === 0 ? pageTotal : Math.floor(pageTotal) + 1;
  const newArr = Array(pageTotal).fill(null);
  let from = 0;
  return newArr.map((_, i) => {
    const to = (i + 1) * itemsInScreen;
    const result = newData.filter((_, j) => j >= from && j < to);
    from = to;
    return result;
  });
}
