import React, { ReactNode } from 'react';
import { View } from 'react-native';
import styles from './styles';

export interface GridProps<T extends any> {
  data: T[];
  column?: number;
  gap?: number;
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => string;
}

export default function Grid<T extends any>({ data, column = 1, gap = 5, renderItem, keyExtractor = (_, index) => String(index) }: GridProps<T>) {
  const _renderItem = (item: T, index: number): ReactNode => {
    return (
      <View key={keyExtractor(item, index)} style={[styles.item, { width: `${100 / column}%`, padding: gap / 2 }]}>
        {renderItem(item, index)}
      </View>
    );
  };

  return <View style={[styles.container, { marginHorizontal: -gap }]}>{data.map(_renderItem)}</View>;
}
