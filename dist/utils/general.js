export const getColumn = (setting) => {
    if (!setting) {
        return 0;
    }
    return setting.number_of_columns_mobile || setting.number_of_columns_tablet || setting.number_of_columns_desktop;
};
export const getRow = (setting) => {
    if (!setting) {
        return 0;
    }
    return setting.number_of_rows_mobile || setting.number_of_rows_tablet || setting.number_of_rows_desktop;
};
export const getGap = (setting) => {
    if (!setting) {
        return 0;
    }
    return setting.gap_mobile || setting.gap_tablet || setting.gap_desktop;
};
export const getInstaGridData = (instaSection, row, column) => {
    if (!instaSection.posts) {
        return [];
    }
    const len = instaSection.posts.length;
    return instaSection.posts.filter((_post, index) => index >= 0 && index < Math.min(row * column, len));
};
export function splitCarouselData(data, numCol, numRow) {
    if (data.length === 0) {
        return [];
    }
    const newData = data.map((item, index) => ({ ...item, index }));
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
