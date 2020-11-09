import React, { ReactNode, memo } from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator, View, Text } from 'react-native';
import styles from './styles';

export type Size = 'small' | 'medium' | 'large';

export type Radius = 'default' | 'round' | 'pill';

export interface ButtonProps extends TouchableOpacityProps {
  children?: ReactNode;
  borderRadius?: Radius;
  size?: Size;
  block?: boolean;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  borderWidth?: 1 | 2 | 3;
  loading?: boolean;
  loadingColor?: string;
  LoadingComponent?: ReactNode;
}

function Button({
  children,
  borderRadius = 'default',
  size = 'medium',
  block = false,
  activeOpacity = 0.8,
  backgroundColor = '#eee',
  color = '#333',
  borderWidth = 1,
  borderColor = 'transparent',
  loading = false,
  loadingColor = 'light',
  LoadingComponent,
  style,
  ...rest
}: ButtonProps) {
  return (
    <View style={block ? {} : { flexWrap: 'wrap' }}>
      <TouchableOpacity
        {...rest}
        style={[styles.touchable, styles[size], styles[borderRadius], { backgroundColor, borderColor, borderWidth }, style]}
        activeOpacity={activeOpacity}
      >
        <View style={styles.inner}>
          {loading ? (
            LoadingComponent ?? <ActivityIndicator size="small" color={loadingColor} />
          ) : typeof children === 'string' ? (
            <Text style={[{ color, textAlign: 'center', fontSize: 13 }]}>{children}</Text>
          ) : (
            children
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default memo(Button);
