import { useState, useEffect } from 'react';
import { CreateStateInterface } from './createState';

interface MapStateDefault {
  getState: CreateStateInterface['getState'];
  subscribe: CreateStateInterface['subscribe'];
}

export default function useSelector<T extends MapStateDefault>(state: T) {
  const [reactState, setReactState] = useState<ReturnType<T['getState']>>(state.getState());

  const handleSubscribe = () => {
    setReactState(state.getState());
  };

  useEffect(() => {
    const unsub = state.subscribe(handleSubscribe);
    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return reactState;
}
