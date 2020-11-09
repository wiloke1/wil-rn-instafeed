export var getColumn = function (setting) {
    return setting.number_of_columns_mobile || setting.number_of_columns_tablet || setting.number_of_columns_desktop;
};
export var getRow = function (setting) {
    return setting.number_of_rows_mobile || setting.number_of_rows_tablet || setting.number_of_rows_desktop;
};
export var getGap = function (setting) {
    return setting.gap_mobile || setting.gap_tablet || setting.gap_desktop;
};
export var getInstaData = function (instaSection, row, column) {
    if (!instaSection.posts) {
        return [];
    }
    var len = instaSection.posts.length;
    return instaSection.posts.filter(function (_post, index) { return index >= 0 && index < Math.min(row * column, len); });
};
