var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Image, StyleSheet, Linking } from 'react-native';
import Grid from "../components/Grid/Grid";
import { getColumn, getGap, getInstaData, getRow } from "../utils/general";
import useSelector from "../utils/useSelector";
import Button from "../components/Button/Button";
import { __wilInstagramShopify__ } from './fakeSettings';
import appStore from './store/appStore';
import modalStore from './store/modalStore';
import ModalInsta from './ModalInsta';
var endpoints = new Set();
var styles = StyleSheet.create({
    imageWrap: {
        backgroundColor: '#eee',
    },
    image: {
        width: '100%',
        paddingTop: '100%',
    },
    loading: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadmore: { alignItems: 'center', marginTop: 15 },
});
var InstaFeed = function (_a) {
    var _b;
    var _c = _a.settings, settings = _c === void 0 ? __wilInstagramShopify__ : _c, username = _a.username;
    var setting = settings.filter(function (setting) { return setting.insta_username === username; })[0];
    var row = getRow(setting);
    var _d = useState(row), rowState = _d[0], setRowState = _d[1];
    var appSelect = useSelector(appStore);
    var instaSection = appSelect[username];
    var column = getColumn(setting);
    var gap = getGap(setting);
    var getInstaFeed = function () {
        settings.forEach(function (setting) { return __awaiter(void 0, void 0, void 0, function () {
            var cond;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!setting.insta_username) return [3 /*break*/, 2];
                        cond = !endpoints.has(setting.insta_username);
                        endpoints.add(setting.insta_username);
                        if (!cond) return [3 /*break*/, 2];
                        return [4 /*yield*/, appStore.getInstagramRequest(setting.insta_username)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    var handleLoadMore = function () {
        setRowState(function (rowState) { return rowState + column * 3; });
    };
    var handleOpenModal = function (id, link, index) { return function () {
        switch (setting.click_item_action) {
            case 'navigate_instagram':
                Linking.openURL(link);
                break;
            case 'open_modal':
                modalStore.handleOpenModal(id, index);
                break;
            case 'none':
            default:
                break;
        }
    }; };
    useEffect(function () {
        getInstaFeed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var renderInstaItem = function (item, index) {
        return (React.createElement(TouchableOpacity, { activeOpacity: 1, style: styles.imageWrap, onPress: handleOpenModal(item.shortcode, item.link, index) },
            React.createElement(Image, { source: { uri: item.thumbnailSrc }, resizeMode: "cover", style: styles.image })));
    };
    if (!instaSection || !!instaSection.message) {
        return null;
    }
    if (instaSection.isLoading) {
        return (React.createElement(View, { style: styles.loading },
            React.createElement(ActivityIndicator, { size: "small", color: "#666" })));
    }
    return (React.createElement(View, null,
        React.createElement(View, null,
            React.createElement(Grid, { gap: gap, column: column, data: getInstaData(instaSection, rowState, column), keyExtractor: function (item) { return item.shortcode; }, renderItem: renderInstaItem })),
        rowState * column < (((_b = instaSection.posts) === null || _b === void 0 ? void 0 : _b.length) || Infinity) && (React.createElement(View, { style: styles.loadmore },
            React.createElement(Button, { borderRadius: "round", onPress: handleLoadMore, backgroundColor: setting.link_color, color: "#fff" }, setting.btn_action_loadmore.text))),
        React.createElement(ModalInsta, { instaSection: instaSection, setting: setting })));
};
export default InstaFeed;
