import React, { memo } from 'react';
import { Linking, Text, View } from 'react-native';
import styles from './styles';
const regExpUserTag = /@(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}/g;
const InstaCardContent = ({ linkColor, textColor, hashtags, text, date }) => {
    if (!text) {
        return null;
    }
    return (<View style={styles.content}>
      <Text style={{ color: textColor, lineHeight: 20 }}>
        {text.split(' ').map((item, index) => {
        if (hashtags?.includes(item)) {
            return (<Text key={index} style={{ color: linkColor }} onPress={() => {
                Linking.openURL(`https://www.instagram.com/explore/tags/${item}`);
            }}>{`${item} `}</Text>);
        }
        if (regExpUserTag.test(item)) {
            return (<Text key={index} style={{ color: linkColor }} onPress={() => {
                Linking.openURL(`https://www.instagram.com/${item.replace(/^@/g, '')}`);
            }}>{`${item} `}</Text>);
        }
        return `${item} `;
    })}
      </Text>
      <Text style={[styles.date, { color: textColor }]}>{date}</Text>
    </View>);
};
export default memo(InstaCardContent);
