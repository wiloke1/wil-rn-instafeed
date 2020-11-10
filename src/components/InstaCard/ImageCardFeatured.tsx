import { GalleryItem } from 'api/Instagram';
import React, { FC, useRef, memo, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, Image, StatusBar, View } from 'react-native';
import Carousel from 'components/Carousel/Carousel';
import delay from 'utils/delay';
import styles from './styles';

export interface ImageCardFeaturedProps {
  imageSrc: string;
  isVideo: boolean;
  videoUrl: string;
  gallery?: GalleryItem[];
  height: number;
  width: number;
}

const getHtmlVideo = (videoUrl: string, imageSrc: string, width: number, height: number) => `
    <body style="margin: 0;padding:0;overflow: hidden">
      <div style="position: relative; width: 100%; background-size: cover; background-position: 50% 50%; background-image: url('${imageSrc}')">
        <video style="position: absolute;top:0;left:0;width: 100%;height: 100%" controls="true" name="media"><source src=${videoUrl} type="video/mp4" /></video>
        <div style="padding-top: ${(height / width) * 100}%"></div>
      </div>
    </body>
  `;

const ImageCardFeatured: FC<ImageCardFeaturedProps> = ({ imageSrc, height, width, isVideo, videoUrl, gallery }) => {
  const videoRef = useRef<WebView | null>(null);
  const [videosLoaded, setVideosLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    return () => {
      setVideosLoaded({});
    };
  }, []);

  const renderImage = (uri: string) => {
    return <Image source={{ uri }} style={[styles.image, { width, height }]} />;
  };

  const renderVideo = (videoUrl: string, imageSrc: string, isActive = true) => {
    return (
      <View style={styles.webviewWrap}>
        {!videosLoaded[videoUrl] && (
          <View style={styles.imageUnderlay}>
            {renderImage(imageSrc)}
            <View style={styles.videoLoading}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          </View>
        )}
        {isActive ? (
          <WebView
            ref={videoRef}
            source={{ html: getHtmlVideo(videoUrl, imageSrc, width, height) }}
            onLoadEnd={() => {
              videoRef.current?.injectJavaScript(`
              const videoEl = document.querySelector('video');
              videoEl.addEventListener('pause', () => {
                window.ReactNativeWebView.postMessage();
              })
            `);
              setVideosLoaded(videosLoaded => ({
                ...videosLoaded,
                [videoUrl]: true,
              }));
            }}
            scrollEnabled={false}
            style={{ width, height }}
            onMessage={() => {
              StatusBar.setHidden(true);
            }}
          />
        ) : (
          <View style={{ width, height }} />
        )}
      </View>
    );
  };

  if (!!gallery) {
    return (
      <Carousel
        horizontal
        pagingEnabled
        removeClippedSubviews
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        data={gallery}
        keyExtractor={item => item.shortcode}
        renderItem={({ item }, isActive) => {
          if (item.video) {
            return renderVideo(item.videoUrl, item.thumbnails[1].src, isActive);
          }
          return renderImage(item.thumbnails[1].src);
        }}
        onScrollEndDrag={async () => {
          await delay(200);
          setVideosLoaded({});
        }}
      />
    );
  }
  if (isVideo) {
    return renderVideo(videoUrl, imageSrc);
  }
  return renderImage(imageSrc);
};

export default memo(ImageCardFeatured);
