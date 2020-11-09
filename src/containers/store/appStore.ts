import createState from 'utils/createState';
import { Instagram } from 'api/Instagram';
import getHourDistance from 'utils/getHourDistance';

export interface AppStore {
  [key: string]: Partial<{
    isLoading: boolean;
    message: string;
    posts: Instagram['posts'];
    profile: Instagram['profile'];
    prevTimestamp: number;
  }>;
}

const initialState: AppStore = {};

const TIME_CACHE = 24;

const { getState, setState, subscribe } = createState(initialState);

const appLoading = (endpoint: string) => {
  setState(state => ({
    ...state,
    [endpoint]: {
      ...state[endpoint],
      isLoading: true,
    },
  }))('getInstagram/request');
};

const appSuccess = ({ endpoint, posts, profile }: Instagram & { endpoint: string }) => {
  setState(state => ({
    ...state,
    [endpoint]: {
      isLoading: false,
      posts,
      profile,
      prevTimestamp: Date.now(),
    },
  }))('getInstagram/success');
};

const appFailure = (endpoint: string) => {
  setState(state => ({
    ...state,
    [endpoint]: {
      ...state[endpoint],
      isLoading: false,
      message: 'error',
    },
  }))('getInstagram/failure');
};

const getInstagram = async (endpoint: string) => {
  try {
    const res = await fetch(
      `https://instafeedhub.com/wp-json/wiloke/v1/instagram/me/insta-user/${endpoint}/media`,
    );
    const json: Instagram = await res.json();
    console.log(json);
    const { posts, profile } = json;
    if (res.status !== 200) {
      return await Promise.reject('error');
    }
    appSuccess({ endpoint, posts, profile });
  } catch (err) {
    console.log(err);
    appFailure(endpoint);
  }
};

const loadInstagramFromCache = (endpoint: string) => {
  return new Promise((resolve: () => void) => {
    queueMicrotask(() => {
      setState(state => ({
        ...state,
        [endpoint]: {
          ...state[endpoint],
          isLoading: false,
        },
      }))('getInstagram/success');
      resolve();
    });
  });
};

const getInstagramRequest = async (endpoint: string, callback?: () => void) => {
  appLoading(endpoint);
  callback?.();
  const { prevTimestamp } = getState()[endpoint];
  if (!!prevTimestamp && getHourDistance(prevTimestamp) < TIME_CACHE) {
    await loadInstagramFromCache(endpoint);
  } else {
    await getInstagram(endpoint);
  }
};

const appStore = {
  getState,
  subscribe,
  getInstagramRequest,
};

export default appStore;
