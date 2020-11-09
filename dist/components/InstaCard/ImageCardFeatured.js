import React, { useRef, memo } from 'react';
import { WebView } from 'react-native-webview';
import { Image, StatusBar } from 'react-native';
import RNSuspense from "../RNSuspense/RNSuspense";
import Carousel from "../Carousel/Carousel";
import styles from './styles';
var getHtmlVideo = function (videoUrl, imageSrc, width, height) { return "\n    <body style=\"margin: 0;padding:0;overflow: hidden\">\n      <div style=\"position: relative; width: 100%; background-size: cover; background-position: 50% 50%; background-image: url('" + imageSrc + "')\">\n        <video style=\"position: absolute;top:0;left:0;width: 100%;height: 100%\" controls=\"true\" name=\"media\"><source src=" + videoUrl + " type=\"video/mp4\" /></video>\n        <div style=\"padding-top: " + (height / width) * 100 + "%\"></div>\n      </div>\n    </body>\n  "; };
var ImageCardFeatured = function (_a) {
    var imageSrc = _a.imageSrc, height = _a.height, width = _a.width, isVideo = _a.isVideo, videoUrl = _a.videoUrl, gallery = _a.gallery;
    var videoRef = useRef(null);
    var renderVideo = function (videoUrl, imageSrc) {
        return (React.createElement(RNSuspense, null,
            React.createElement(WebView, { ref: videoRef, source: { html: getHtmlVideo(videoUrl, imageSrc, width, height) }, onLoadEnd: function () {
                    var _a;
                    (_a = videoRef.current) === null || _a === void 0 ? void 0 : _a.injectJavaScript("\n            const videoEl = document.querySelector('video');\n            videoEl.addEventListener('pause', () => {\n              window.ReactNativeWebView.postMessage();\n            })\n          ");
                }, scrollEnabled: false, style: { width: width, height: height }, onMessage: function () {
                    StatusBar.setHidden(true);
                } })));
    };
    var renderImage = function (uri) {
        return (React.createElement(RNSuspense, null,
            React.createElement(Image, { source: { uri: uri }, style: [styles.image, { width: width, height: height }] })));
    };
    if (!!gallery) {
        return (React.createElement(RNSuspense, null,
            React.createElement(Carousel, { horizontal: true, pagingEnabled: true, removeClippedSubviews: true, showsHorizontalScrollIndicator: false, data: gallery, renderItem: function (_a) {
                    var item = _a.item;
                    if (item.video) {
                        return renderVideo(item.videoUrl, item.thumbnails[1].src);
                    }
                    return renderImage(item.thumbnails[1].src);
                } })));
    }
    if (isVideo) {
        return renderVideo(videoUrl, imageSrc);
    }
    return renderImage(imageSrc);
};
export default memo(ImageCardFeatured);
