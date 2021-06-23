import React, { PureComponent, createRef } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

class componentName extends PureComponent {
  //   shouldComponentUpdate(nextProps, nextState) {
  //     return shallowCompare(this, nextProps, nextState);
  //   }

  intervalRef = createRef();

  state = {
    i: 0,
  };

  mouseMove() {
    console.log('mousemove');
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.mouseMove);
    this.intervalRef.current = setInterval(() => {
      this.setState((value) => ({
        i: value.i + 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    document.removeEventListener(
      'mousemove',
      this.mouseMove
    );
    clearInterval(this.intervalRef.current);
    // cancel api
  }

  render() {
    console.log('test component');
    console.log(this.state.i);
    if (this.state.i === 3) {
      throw new Error('laksdjfjdksfj');
    }
    return <div>text Component</div>;
  }
}

export default componentName;
