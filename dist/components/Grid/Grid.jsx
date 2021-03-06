import React from 'react';
import { View } from 'react-native';
import styles from './styles';
export default function Grid({ data, column = 1, gap = 5, renderItem, keyExtractor = (_, index) => String(index) }) {
    const _renderItem = (item, index) => {
        return (<View key={keyExtractor(item, index)} style={[styles.item, { width: `${100 / column}%`, padding: gap / 2 }]}>
        {renderItem(item, index)}
      </View>);
    };
    return <View style={[styles.container, { marginHorizontal: -gap / 2 }]}>{data.map(_renderItem)}</View>;
}
