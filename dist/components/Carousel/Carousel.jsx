import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { COLORS } from "../../utils/constants";
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
        width: 6,
        height: 6,
        borderRadius: 6,
        marginHorizontal: 3,
    },
});
const Carousel = ({ data, onMomentumScrollEnd, keyExtractor, renderItem, ...rest }) => {
    const [indexActive, setIndexActive] = useState(0);
    const handleDragEnd = (event) => {
        if (!!event.nativeEvent?.contentOffset) {
            const indexActive = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
            setIndexActive(indexActive);
        }
        onMomentumScrollEnd?.(event);
    };
    return (<View style={styles.container}>
      <FlatList {...rest} keyExtractor={keyExtractor} data={data} 
    // @ts-ignore
    renderItem={info => {
        return renderItem?.(info, info.index === indexActive);
    }} onMomentumScrollEnd={handleDragEnd}/>
      <View pointerEvents="none" style={styles.pager}>
        {data?.map((item, index) => {
        return (<View key={keyExtractor?.(item, index)} style={[styles.pagerItem, { backgroundColor: index === indexActive ? COLORS.PRIMARY : '#fff' }]}></View>);
    })}
      </View>
    </View>);
};
export default Carousel;
