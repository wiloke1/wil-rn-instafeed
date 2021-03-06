import { useState, useEffect } from 'react';
export default function useSelector(state) {
    const [reactState, setReactState] = useState(state.getState());
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
