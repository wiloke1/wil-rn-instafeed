# wil-rn-instafeed

React Native Instafeed Using API [https://instafeedhub.com/](https://instafeedhub.com/)

[![npm version](https://img.shields.io/npm/v/wil-rn-instafeed.svg)](https://www.npmjs.com/package/wil-rn-instafeed)

## Install

**npm**

```bash
npm install wil-rn-instafeed --save
```

**yarn**

```bash
yarn add wil-rn-instafeed
```

[![npm version](https://insta-layout.netlify.app/insta.png)](https://www.npmjs.com/package/wil-rn-instafeed)

## Usage

```js
import React from 'react';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import { InstaFeed, Settings } from 'wil-rn-instafeed';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const settings: Settings = [
  {
    id: '2134234',
    slot_data_id: '911',
    modal_view_mode: 'scroll',
    click_item_action: 'open_modal',
    insta_username: 'jakeelko',
    template: 'grid',
    post_template: 'style1',
    number_of_columns_desktop: 4,
    number_of_columns_tablet: 3,
    number_of_columns_mobile: 3,
    number_of_rows_desktop: 2,
    number_of_rows_tablet: 3,
    number_of_rows_mobile: 3,
    slider_autoplay: 'disable',
    slider_delay: 4000,
    slider_speed: 0,
    title: 'Title',
    brick_row_height_desktop: 400,
    brick_row_height_mobile: 100,
    brick_row_height_tablet: 200,
    btn_action_copylink: {
      status: 'enable',
      text: 'Copy Link',
    },
    btn_action_follow: {
      status: 'enable',
      text: 'Follow',
    },
    btn_action_loadmore: {
      status: 'enable',
      text: 'Load more',
    },
    btn_action_share: {
      status: 'enable',
      text: 'Share',
    },
    btn_action_share_email: {
      status: 'enable',
      text: 'Email share',
    },
    btn_action_share_facebook: {
      status: 'enable',
      text: 'Facebook share',
    },
    btn_action_share_messenger: {
      status: 'enable',
      text: 'Mes share',
    },
    btn_action_share_twitter: {
      status: 'enable',
      text: 'Twitter share',
    },
    text_color_popup: '#505058',
    text_color: '#fff',
    overlay_gradient: {
      color1: '#000',
      color2: '#fff',
    },
    overlay_gradient_popup: {
      color1: '#fff',
      color2: '#fff',
    },
    gap_desktop: 10,
    gap_tablet: 10,
    gap_mobile: 10,
    link_color: '#0095f6',
    link_color_popup: '#0095f6',
    btn_close_color_popup: '#000',
  },
  {
    id: '2134235',
    slot_data_id: '9112',
    modal_view_mode: 'scroll',
    click_item_action: 'open_modal',
    insta_username: 'phodacbiet',
    template: 'slider',
    post_template: 'style1',
    number_of_columns_desktop: 4,
    number_of_columns_tablet: 3,
    number_of_columns_mobile: 3,
    number_of_rows_desktop: 2,
    number_of_rows_tablet: 3,
    number_of_rows_mobile: 3,
    slider_autoplay: 'disable',
    slider_delay: 4000,
    slider_speed: 0,
    title: 'Title',
    brick_row_height_desktop: 400,
    brick_row_height_mobile: 100,
    brick_row_height_tablet: 200,
    btn_action_copylink: {
      status: 'enable',
      text: 'Copy Link',
    },
    btn_action_follow: {
      status: 'enable',
      text: 'Follow',
    },
    btn_action_loadmore: {
      status: 'enable',
      text: 'Load more',
    },
    btn_action_share: {
      status: 'enable',
      text: 'Share',
    },
    btn_action_share_email: {
      status: 'enable',
      text: 'Email share',
    },
    btn_action_share_facebook: {
      status: 'enable',
      text: 'Facebook share',
    },
    btn_action_share_messenger: {
      status: 'enable',
      text: 'Mes share',
    },
    btn_action_share_twitter: {
      status: 'enable',
      text: 'Twitter share',
    },
    text_color_popup: '#505058',
    text_color: '#fff',
    overlay_gradient: {
      color1: '#000',
      color2: '#fff',
    },
    overlay_gradient_popup: {
      color1: '#fff',
      color2: '#fff',
    },
    gap_desktop: 10,
    gap_tablet: 10,
    gap_mobile: 10,
    link_color: '#0095f6',
    link_color_popup: '#0095f6',
    btn_close_color_popup: '#000',
  }
]

export default function App() {
  return (
    <ScrollView>
      <View>
        <InstaFeed slotId="911" containerWidth={SCREEN_WIDTH} settings={settings} />
        <InstaFeed slotId="9112" containerWidth={SCREEN_WIDTH} settings={settings} />
      </View>
    </ScrollView>
  );
}
```

## API

| Prop                  | Type                                | Default | Description |
| :---------            | :-------:                           | :-----: | :----------- |
| slotId ( required )   | `string`                     | -       | slot_data_id in settings  |
| settings ( optional )             | `Settings[]`                     | `[]`       | array setting |
| containerWidth ( required )    | `number`      | -       | width of instafeed |
| useNavigation ( optional )    | `boolean`      | -       | react navigation |
| navigation ( optional )    | `React Navigation`      | -       | react navigation |
| screenName ( optional )    | `string`      | -       | react navigation |

## License

MIT © [wiloke1](https://github.com/wiloke1)
