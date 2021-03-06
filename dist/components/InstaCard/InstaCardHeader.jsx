import React, { memo } from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
const InstaCardHeader = ({ avatarSrc, authorName, authorProfileName, authorProfileLink }) => {
    const handleOpenProfileLink = () => {
        Linking.openURL(authorProfileLink);
    };
    return (<TouchableOpacity style={styles.header} onPress={handleOpenProfileLink}>
      <Image source={{ uri: avatarSrc }} style={styles.avatar}/>
      <View>
        <Text style={styles.authorName} numberOfLines={1}>
          {authorName}
        </Text>
        <Text style={styles.authorLink} numberOfLines={1}>{`@${authorProfileName}`}</Text>
      </View>
    </TouchableOpacity>);
};
export default memo(InstaCardHeader);
