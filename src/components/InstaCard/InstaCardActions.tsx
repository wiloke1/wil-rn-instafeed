import Button from 'components/Button/Button';
import React, { FC, memo } from 'react';
import { Image, Linking, Platform, Share, ShareContent, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from 'utils/constants';
import { iconComment, iconFollow, iconLike, iconShare } from 'utils/icons';
import numberFormat from 'utils/numberFormat';
import styles from './styles';

export interface InstaCardActionsProps {
  authorProfileLink: string;
  followText: string;
  shareText: string;
  comment: number;
  like: number;
  textColor: string;
  urlShare: string;
}

const InstaCardActions: FC<InstaCardActionsProps> = ({ textColor, comment, like, authorProfileLink, followText, shareText, urlShare }) => {
  const shareContentIOS: ShareContent = {
    message: '',
    url: urlShare,
  };
  const shareContentAndroid: ShareContent = {
    message: urlShare,
  };
  const shareContent = Platform.OS === 'ios' ? shareContentIOS : shareContentAndroid;

  const handleShare = () => {
    try {
      Share.share(shareContent);
    } catch {
      console.log('share error');
    }
  };

  const handleOpenProfileLink = () => {
    Linking.openURL(authorProfileLink);
  };

  return (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.actionsLeft} onPress={handleOpenProfileLink}>
        <View style={styles.iconText}>
          <Image source={{ uri: iconLike }} style={[styles.iconLike, { tintColor: textColor }]} />
          <Text style={[styles.actionsLeftText, { color: textColor }]}>{numberFormat(like)}</Text>
        </View>
        <View style={styles.iconText}>
          <Image source={{ uri: iconComment }} style={[styles.iconComment, { tintColor: textColor }]} />
          <Text style={[styles.actionsLeftText, { color: textColor }]}>{numberFormat(comment)}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.actionsRight}>
        <Button backgroundColor={COLORS.DARK_6} borderRadius="pill" size="small" onPress={handleShare}>
          <Image source={{ uri: iconShare }} style={styles.icon} />
          <Text style={styles.buttonTextShare}>{shareText}</Text>
        </Button>
        <View style={styles.buttonFollow}>
          <Button
            backgroundColor={COLORS.PRIMARY}
            borderRadius="pill"
            size="small"
            onPress={() => {
              Linking.openURL(authorProfileLink);
            }}
          >
            <Image source={{ uri: iconFollow }} style={[styles.icon, { tintColor: '#fff' }]} />
            <Text style={styles.buttonTextFollow}>{followText}</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default memo(InstaCardActions);
