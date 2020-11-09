import React, { FC, memo } from 'react';
import { Dimensions, View } from 'react-native';
import { COLORS } from 'utils/constants';
import styles from './styles';
import InstaCardHeader, { InstaCardHeaderProps } from './InstaCardHeader';
import InstaCardContent, { InstaCardContentProps } from './InstaCardContent';
import InstaCardActions, { InstaCardActionsProps } from './InstaCardActions';
import ImageCardFeatured, { ImageCardFeaturedProps } from './ImageCardFeatured';

export interface InstaCardProps
  extends InstaCardHeaderProps,
    InstaCardActionsProps,
    InstaCardContentProps,
    Omit<ImageCardFeaturedProps, 'height' | 'width'> {
  imageWidth: number;
  imageHeight: number;
  shareButtonFacebook?: string;
  shareButtonMessenger?: string;
  shareButtonTwitter?: string;
  shareButtonEmail?: string;
  shareButtonCopylink?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const InstaCard: FC<InstaCardProps> = ({
  imageSrc,
  avatarSrc,
  authorName,
  authorProfileLink,
  authorProfileName,
  comment,
  date,
  followText,
  imageHeight,
  imageWidth,
  isVideo,
  like,
  shareText,
  text,
  urlShare,
  videoUrl,
  gallery,
  hashtags,
  linkColor = COLORS.SECONDARY,
  textColor = COLORS.DARK_2,
}) => {
  return (
    <View style={styles.container}>
      <ImageCardFeatured
        imageSrc={imageSrc}
        height={(imageHeight * SCREEN_WIDTH) / imageWidth}
        width={SCREEN_WIDTH}
        isVideo={isVideo}
        videoUrl={videoUrl}
        gallery={gallery}
      />
      <View style={styles.body}>
        <InstaCardHeader avatarSrc={avatarSrc} authorName={authorName} authorProfileName={authorProfileName} authorProfileLink={authorProfileLink} />
        <InstaCardActions
          textColor={textColor}
          authorProfileLink={authorProfileLink}
          like={like}
          comment={comment}
          shareText={shareText}
          followText={followText}
          urlShare={urlShare}
        />
        <InstaCardContent text={text} linkColor={linkColor} textColor={textColor} hashtags={hashtags} date={date} />
      </View>
    </View>
  );
};

export default memo(InstaCard);
