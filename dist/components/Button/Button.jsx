import React, { memo } from 'react';
import { TouchableOpacity, ActivityIndicator, View, Text } from 'react-native';
import styles from './styles';
function Button({ children, borderRadius = 'default', size = 'medium', block = false, activeOpacity = 0.8, backgroundColor = '#eee', color = '#333', borderWidth = 1, borderColor = 'transparent', loading = false, loadingColor = 'light', LoadingComponent, style, ...rest }) {
    return (<View style={block ? {} : { flexWrap: 'wrap' }}>
      <TouchableOpacity {...rest} style={[styles.touchable, styles[size], styles[borderRadius], { backgroundColor, borderColor, borderWidth }, style]} activeOpacity={activeOpacity}>
        <View style={styles.inner}>
          {loading ? (LoadingComponent ?? <ActivityIndicator size="small" color={loadingColor}/>) : typeof children === 'string' ? (<Text style={[{ color, textAlign: 'center', fontSize: 13 }]}>{children}</Text>) : (children)}
        </View>
      </TouchableOpacity>
    </View>);
}
export default memo(Button);
