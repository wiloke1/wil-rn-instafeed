import { PureComponent, ReactNode } from 'react';

interface RNSuspenseProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface RNSuspenseState {
  isLoaded: boolean;
}

type DefaultProps = Pick<RNSuspenseProps, 'fallback'>;

export default class RNSuspense extends PureComponent<RNSuspenseProps, RNSuspenseState> {
  static defaultProps: DefaultProps = {
    fallback: null,
  };

  _req!: number;

  constructor(props: RNSuspenseProps) {
    super(props);
    this.state = {
      isLoaded: false,
    };
    this._req = requestAnimationFrame(this._handleLoaded);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this._req);
  }

  _handleLoaded = () => {
    this.setState({
      isLoaded: true,
    });
  };

  render() {
    const { children, fallback } = this.props;
    const { isLoaded } = this.state;
    return isLoaded ? children : fallback;
  }
}
