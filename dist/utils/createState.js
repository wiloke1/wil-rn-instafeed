import stateLog from './stateLog';
const defaultConfig = {
    useLocalStorage: false,
    stateName: '@state',
};
export class CreateState {
    constructor(initialState, config = defaultConfig) {
        this.updateStateFromLocalStorage = () => {
            const { useLocalStorage, stateName } = this.config;
            const state = !!window.localStorage ? window.localStorage.getItem(stateName) : this.state;
            if (useLocalStorage && !!state) {
                try {
                    this.state = typeof state === 'string' ? JSON.parse(state) : state;
                }
                catch {
                    this.state = state;
                }
            }
        };
        this.callListeners = () => {
            this.listeners.forEach(listener => {
                listener(this.state);
            });
        };
        this.callCompare = () => {
            if (!this.compareFunc) {
                return this.callListeners();
            }
            const isUpdate = this.compareFunc(this.prevState, this.state);
            isUpdate && this.callListeners();
        };
        this.getState = () => {
            return this.state;
        };
        this.setState = (state) => {
            const { useLocalStorage, stateName } = this.config;
            this.prevState = this.state;
            if (typeof state === 'function') {
                this.state = state(this.prevState);
            }
            else {
                this.state = state;
            }
            if (useLocalStorage && !!window.localStorage) {
                window.localStorage.setItem(stateName, JSON.stringify(this.state));
            }
            this.callCompare();
            return (actionName = 'setState') => {
                stateLog(actionName, this.prevState, this.state);
            };
        };
        this.subscribe = (listener) => {
            this.updateStateFromLocalStorage();
            this.listeners.push(listener);
            return () => {
                this.listeners = this.listeners.filter(_listener => _listener !== listener);
            };
        };
        this.shouldUpdate = (compareFunc) => {
            this.compareFunc = compareFunc;
        };
        this.state = initialState;
        this.config = config;
        this.listeners = [];
        if (!config.useLocalStorage && !!window.localStorage) {
            window.localStorage.removeItem(config.stateName);
        }
        this.updateStateFromLocalStorage();
    }
}
export default function createState(initialState, config = defaultConfig) {
    return new CreateState(initialState, config);
}
