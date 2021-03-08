import React, { memo, useRef } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Platform, View, Image } from 'react-native';
import InstaCard from "../components/InstaCard/InstaCard";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import useSelector from "../utils/useSelector";
import { COLORS } from "../utils/constants";
import { iconClose } from "../utils/icons";
import modalStore from './store/modalStore';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    flatlist: {
        backgroundColor: COLORS.DARK_6,
    },
    image: {
        paddingTop: '50%',
        borderWidth: 10,
    },
    close: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 9,
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: COLORS.DARK_1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconClose: {
        tintColor: '#fff',
        width: 20,
        height: 20,
    },
});
const InstaContent = ({ instaSection, setting, slotId, useNavigation = false, navigation }) => {
    const listInstaRef = useRef(null);
    const modalSelect = useSelector(modalStore);
    const itemActive = instaSection.posts?.[modalSelect[slotId]?.indexActive];
    const data = [
        ...(!!itemActive ? [itemActive] : []),
        ...(instaSection.posts?.filter(item => item.shortcode !== modalSelect[slotId]?.idActive) || []),
    ];
    const handleCloseModal = () => {
        if (useNavigation) {
            navigation.goBack();
        }
        else {
            modalStore.handleCloseModal(slotId);
        }
    };
    const handleScrollEndDrag = (event) => {
        const { contentOffset } = event.nativeEvent;
        if (contentOffset.y <= -80 && !useNavigation) {
            modalStore.handleCloseModal(slotId);
        }
    };
    const renderInstaItem = ({ item }) => {
        return (<InstaCard imageSrc={item.thumbnailSrc} avatarSrc={instaSection.profile?.profilePicture || ''} authorName={instaSection.profile?.fullName || ''} authorProfileName={instaSection.profile?.userName || ''} authorProfileLink={`https://www.instagram.com/${instaSection.profile?.userName || ''}`} comment={item.comments} like={item.likes} text={item.caption} hashtags={item.hashtags} linkColor={setting.link_color_popup} textColor={setting.text_color_popup} followText={setting.btn_action_follow.status === 'enable' ? setting.btn_action_follow.text : ''} shareText={setting.btn_action_share.status === 'enable' ? setting.btn_action_share.text : ''} shareButtonFacebook={setting.btn_action_share_facebook.status === 'enable' ? setting.btn_action_share_facebook.text : ''} shareButtonTwitter={setting.btn_action_share_twitter.status === 'enable' ? setting.btn_action_share_twitter.text : ''} shareButtonMessenger={setting.btn_action_share_messenger.status === 'enable' ? setting.btn_action_share_messenger.text : ''} shareButtonCopylink={setting.btn_action_copylink.status === 'enable' ? setting.btn_action_copylink.text : ''} shareButtonEmail={setting.btn_action_share_email.status === 'enable' ? setting.btn_action_share_email.text : ''} date={Platform.OS === 'android'
            ? dayjs(item.date.date).fromNow()
            : dayjs
                .utc(item.date.date)
                .tz(item.date.timezone)
                .fromNow()} imageWidth={item.width} imageHeight={item.height} urlShare={item.link} gallery={item.gallery} isVideo={item.video} videoUrl={item.videoUrl || ''}/>);
    };
    return (<View style={styles.container}>
      <TouchableOpacity onPress={handleCloseModal} style={styles.close}>
        <Image source={{ uri: iconClose }} style={styles.iconClose}/>
      </TouchableOpacity>
      <FlatList removeClippedSubviews contentContainerStyle={styles.flatlist} ref={listInstaRef} data={data} keyExtractor={item => item.shortcode} renderItem={renderInstaItem} onScrollEndDrag={handleScrollEndDrag} nestedScrollEnabled/>
    </View>);
};
export default memo(InstaContent);
