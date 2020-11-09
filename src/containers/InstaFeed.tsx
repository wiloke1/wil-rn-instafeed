import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Image, StyleSheet, Linking } from 'react-native';
import { InstaItem } from 'api/Instagram';
import Grid from 'components/Grid/Grid';
import { Settings } from 'types';
import { getColumn, getGap, getInstaData, getRow } from 'utils/general';
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
   * Instagram username
   */
  username: string;
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

const InstaFeed: FC<InstaFeedProps> = ({ settings = __wilInstagramShopify__, username }) => {
  const [setting] = settings.filter(setting => setting.insta_username === username);
  const row = getRow(setting);
  const [rowState, setRowState] = useState(row);
  const appSelect = useSelector(appStore);
  const instaSection = appSelect[username];
  const column = getColumn(setting);
  const gap = getGap(setting);

  const getInstaFeed = () => {
    settings.forEach(async setting => {
      if (setting.insta_username) {
        const cond = !endpoints.has(setting.insta_username);
        endpoints.add(setting.insta_username);
        if (cond) {
          await appStore.getInstagramRequest(setting.insta_username);
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
        modalStore.handleOpenModal(id, index);
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

  if (!instaSection || !!instaSection.message) {
    return null;
  }

  if (instaSection.isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="#666" />
      </View>
    );
  }

  return (
    <View>
      <View>
        <Grid
          gap={gap}
          column={column}
          data={getInstaData(instaSection, rowState, column)}
          keyExtractor={item => item.shortcode}
          renderItem={renderInstaItem}
        />
      </View>
      {rowState * column < (instaSection.posts?.length || Infinity) && (
        <View style={styles.loadmore}>
          <Button borderRadius="round" onPress={handleLoadMore} backgroundColor={setting.link_color} color="#fff">
            {setting.btn_action_loadmore.text}
          </Button>
        </View>
      )}
      <ModalInsta instaSection={instaSection} setting={setting} />
    </View>
  );
};

export default InstaFeed;
