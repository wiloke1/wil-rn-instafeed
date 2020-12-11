import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Image, StyleSheet, Linking, FlatList } from 'react-native';
import { InstaItem } from 'api/Instagram';
import Grid from 'components/Grid/Grid';
import { Settings } from 'types';
import { getColumn, getGap, getInstaGridData, getRow, splitCarouselData } from 'utils/general';
import useSelector from 'utils/useSelector';
import Button from 'components/Button/Button';
import { __wilInstagramShopify__ } from './fakeSettings';
import appStore from './store/appStore';
import modalStore from './store/modalStore';
import ModalInsta from './ModalInsta';

export interface InstaFeedProps {
  /**
   * Insta feed settings
   */
  settings?: Settings;
  /**
   * chỗ đặt instagram
   */
  slotId: string;
  /**
   * container width
   */
  containerWidth: number;
}

const endpoints = new Set<string>();

const styles = StyleSheet.create({
  imageWrap: {
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    paddingTop: '100%',
  },
  loading: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadmore: { alignItems: 'center', marginTop: 15 },
});

const InstaFeed: FC<InstaFeedProps> = ({ settings = __wilInstagramShopify__, slotId, containerWidth }) => {
  const [setting] = settings.filter(setting => setting.slot_data_id === slotId);
  const row = getRow(setting);
  const [rowState, setRowState] = useState(row);
  const appSelect = useSelector(appStore);
  const instaSection = !!setting?.insta_username ? appSelect[setting.insta_username] : {};
  const column = getColumn(setting);
  const gap = getGap(setting);

  const getInstaFeed = () => {
    settings.forEach(setting => {
      if (setting.insta_username) {
        const cond = !endpoints.has(setting.insta_username);
        endpoints.add(setting.insta_username);
        if (cond) {
          appStore.getInstagramRequest(setting.insta_username);
        }
      }
    });
  };

  const handleLoadMore = () => {
    setRowState(rowState => rowState + column * 3);
  };

  const handleOpenModal = (id: string, link: string, index: number) => () => {
    switch (setting.click_item_action) {
      case 'navigate_instagram':
        Linking.openURL(link);
        break;
      case 'open_modal':
        modalStore.handleOpenModal(id, slotId, index);
        break;
      case 'none':
      default:
        break;
    }
  };

  useEffect(() => {
    getInstaFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderInstaItem = (item: InstaItem, index: number) => {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.imageWrap} onPress={handleOpenModal(item.shortcode, item.link, index)}>
        <Image source={{ uri: item.thumbnailSrc }} resizeMode="cover" style={styles.image} />
      </TouchableOpacity>
    );
  };

  if (!instaSection || !!instaSection.message || !setting) {
    return null;
  }

  if (instaSection.isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="#666" />
      </View>
    );
  }

  const renderContent = () => {
    switch (setting.template) {
      case 'grid':
      case 'grid-brick':
        return (
          <View style={{ width: containerWidth }}>
            <Grid
              gap={gap}
              column={column}
              data={getInstaGridData(instaSection, rowState, column)}
              keyExtractor={item => item.shortcode}
              renderItem={renderInstaItem}
            />
            {rowState * column < (instaSection.posts?.length || Infinity) && (
              <View style={styles.loadmore}>
                <Button borderRadius="round" onPress={handleLoadMore} backgroundColor={setting.link_color} color="#fff">
                  {setting.btn_action_loadmore.text}
                </Button>
              </View>
            )}
          </View>
        );
      case 'slider':
        return (
          <View style={{ width: containerWidth, overflow: 'hidden' }}>
            <FlatList
              horizontal
              removeClippedSubviews
              showsHorizontalScrollIndicator={false}
              data={splitCarouselData(instaSection.posts || [], column, rowState)}
              keyExtractor={item => JSON.stringify(item)}
              renderItem={({ item }) => {
                return (
                  <View style={{ width: containerWidth - 10, paddingHorizontal: gap / 2 }}>
                    <Grid
                      gap={gap}
                      column={column}
                      data={item}
                      keyExtractor={item => item.shortcode}
                      renderItem={item => {
                        return renderInstaItem(item, item.index);
                      }}
                    />
                  </View>
                );
              }}
              style={{ width: containerWidth + gap, marginLeft: -gap }}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderContent()}
      <ModalInsta instaSection={instaSection} setting={setting} slotId={slotId} />
    </>
  );
};

export default InstaFeed;
