import { GalleryItem } from 'api/Instagram';
import React, { FC, useRef, memo } from 'react';
import { WebView } from 'react-native-webview';
import { Image, StatusBar } from 'react-native';
import RNSuspense from 'components/RNSuspense/RNSuspense';
import Carousel from 'components/Carousel/Carousel';
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

  const renderVideo = (videoUrl: string, imageSrc: string) => {
    return (
      <RNSuspense>
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
          }}
          scrollEnabled={false}
          style={{ width, height }}
          onMessage={() => {
            StatusBar.setHidden(true);
          }}
        />
      </RNSuspense>
    );
  };

  const renderImage = (uri: string) => {
    return (
      <RNSuspense>
        <Image source={{ uri }} style={[styles.image, { width, height }]} />
      </RNSuspense>
    );
  };

  if (!!gallery) {
    return (
      <RNSuspense>
        <Carousel
          horizontal
          pagingEnabled
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
          data={gallery}
          renderItem={({ item }) => {
            if (item.video) {
              return renderVideo(item.videoUrl, item.thumbnails[1].src);
            }
            return renderImage(item.thumbnails[1].src);
          }}
        />
      </RNSuspense>
    );
  }
  if (isVideo) {
    return renderVideo(videoUrl, imageSrc);
  }
  return renderImage(imageSrc);
};

export default memo(ImageCardFeatured);
