/// <reference types="react" />
import { FlatListProps } from 'react-native';
export interface CarouselProps<ItemT extends any> extends FlatListProps<ItemT> {
}
declare const Carousel: <ItemT extends unknown>({ data, onMomentumScrollEnd, keyExtractor, ...rest }: CarouselProps<ItemT>) => JSX.Element;
export default Carousel;
