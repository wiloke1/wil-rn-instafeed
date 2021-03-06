import React, { Component as RComponent } from 'react';
function getStates(mapStateToProps) {
    return Object.keys(mapStateToProps).reduce((obj, key) => {
        return {
            ...obj,
            [key]: mapStateToProps[key].getState(),
        };
    }, {});
}
function withStore(mapStateToProps) {
    return (Component) => {
        return class extends RComponent {
            constructor(props) {
                super(props);
                this.handleSubscribe = () => {
                    this.setState({
                        ...getStates(mapStateToProps),
                    });
                };
                this.state = {
                    ...getStates(mapStateToProps),
                };
                this.unsubs = Object.keys(mapStateToProps).map(key => {
                    return mapStateToProps[key].subscribe(this.handleSubscribe);
                });
            }
            componentWillUnmount() {
                this.unsubs.forEach(unsub => {
                    unsub();
                });
            }
            render() {
                return <Component {...this.state} {...this.props}/>;
            }
        };
    };
}
export default withStore;
