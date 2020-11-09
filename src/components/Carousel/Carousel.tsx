import React, { useState } from 'react';
import { FlatList, FlatListProps, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import { COLORS } from 'utils/constants';

export interface CarouselProps<ItemT extends any> extends FlatListProps<ItemT> {}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  pager: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagerItem: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 3,
  },
});

const Carousel = <ItemT extends any>({ data, onMomentumScrollEnd, keyExtractor, ...rest }: CarouselProps<ItemT>) => {
  const [indexActive, setIndexActive] = useState(0);

  const handleDragEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!!event.nativeEvent?.contentOffset) {
      const indexActive = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
      setIndexActive(indexActive);
    }
    onMomentumScrollEnd?.(event);
  };

  return (
    <View style={styles.container}>
      <FlatList {...rest} keyExtractor={keyExtractor} data={data} onMomentumScrollEnd={handleDragEnd} />
      <View pointerEvents="none" style={styles.pager}>
        {data?.map((item, index) => {
          return (
            <View
              key={keyExtractor?.(item, index)}
              style={[styles.pagerItem, { backgroundColor: index === indexActive ? COLORS.PRIMARY : '#fff' }]}
            ></View>
          );
        })}
      </View>
    </View>
  );
};

export default Carousel;
