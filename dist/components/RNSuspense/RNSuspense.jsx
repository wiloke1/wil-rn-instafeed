import { PureComponent } from 'react';
export default class RNSuspense extends PureComponent {
    constructor(props) {
        super(props);
        this._handleLoaded = () => {
            this.setState({
                isLoaded: true,
            });
        };
        this.state = {
            isLoaded: false,
        };
        this._req = requestAnimationFrame(this._handleLoaded);
    }
    componentWillUnmount() {
        cancelAnimationFrame(this._req);
    }
    render() {
        const { children, fallback } = this.props;
        const { isLoaded } = this.state;
        return isLoaded ? children : fallback;
    }
}
RNSuspense.defaultProps = {
    fallback: null,
};
