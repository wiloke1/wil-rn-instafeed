import React, { memo } from 'react';
import { Dimensions, View } from 'react-native';
import { COLORS } from "../../utils/constants";
import styles from './styles';
import InstaCardHeader from './InstaCardHeader';
import InstaCardContent from './InstaCardContent';
import InstaCardActions from './InstaCardActions';
import ImageCardFeatured from './ImageCardFeatured';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const InstaCard = ({ imageSrc, avatarSrc, authorName, authorProfileLink, authorProfileName, comment, date, followText, imageHeight, imageWidth, isVideo, like, shareText, text, urlShare, videoUrl, gallery, hashtags, linkColor = COLORS.SECONDARY, textColor = COLORS.DARK_2, }) => {
    return (<View style={styles.container}>
      <ImageCardFeatured imageSrc={imageSrc} height={(imageHeight * SCREEN_WIDTH) / imageWidth} width={SCREEN_WIDTH} isVideo={isVideo} videoUrl={videoUrl} gallery={gallery}/>
      <View style={styles.body}>
        <InstaCardHeader avatarSrc={avatarSrc} authorName={authorName} authorProfileName={authorProfileName} authorProfileLink={authorProfileLink}/>
        <InstaCardActions textColor={textColor} authorProfileLink={authorProfileLink} like={like} comment={comment} shareText={shareText} followText={followText} urlShare={urlShare}/>
        <InstaCardContent text={text} linkColor={linkColor} textColor={textColor} hashtags={hashtags} date={date}/>
      </View>
    </View>);
};
export default memo(InstaCard);
