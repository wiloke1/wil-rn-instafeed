import createState from "../../utils/createState";
import getHourDistance from "../../utils/getHourDistance";
const initialState = {};
const TIME_CACHE = 24;
const { getState, setState, subscribe } = createState(initialState);
const appLoading = (endpoint) => {
    setState(state => ({
        ...state,
        [endpoint]: {
            ...state[endpoint],
            isLoading: true,
        },
    }));
    // ('getInstagram/request');
};
const appSuccess = ({ endpoint, posts, profile }) => {
    setState(state => ({
        ...state,
        [endpoint]: {
            isLoading: false,
            posts,
            profile,
            prevTimestamp: Date.now(),
        },
    }));
    // ('getInstagram/success');
};
const appFailure = (endpoint) => {
    setState(state => ({
        ...state,
        [endpoint]: {
            ...state[endpoint],
            isLoading: false,
            message: 'error',
        },
    }));
    // ('getInstagram/failure');
};
const getInstagram = async (endpoint) => {
    try {
        const res = await fetch(`https://instafeedhub.com/wp-json/wiloke/v1/instagram/me/insta-user/${endpoint}/media`);
        const json = await res.json();
        console.log(json);
        const { posts, profile } = json;
        if (res.status !== 200) {
            return await Promise.reject('error');
        }
        appSuccess({ endpoint, posts, profile });
    }
    catch (err) {
        console.log(err);
        appFailure(endpoint);
    }
};
const loadInstagramFromCache = (endpoint) => {
    return new Promise(resolve => {
        queueMicrotask(() => {
            setState(state => ({
                ...state,
                [endpoint]: {
                    ...state[endpoint],
                    isLoading: false,
                },
            }));
            // ('getInstagram/success');
            resolve(undefined);
        });
    });
};
const getInstagramRequest = async (endpoint, callback) => {
    appLoading(endpoint);
    callback?.();
    const { prevTimestamp } = getState()[endpoint];
    if (!!prevTimestamp && getHourDistance(prevTimestamp) < TIME_CACHE) {
        await loadInstagramFromCache(endpoint);
    }
    else {
        await getInstagram(endpoint);
    }
};
const appStore = {
    getState,
    subscribe,
    getInstagramRequest,
};
export default appStore;
