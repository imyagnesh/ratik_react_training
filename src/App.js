import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Test from './test';

let outerData = 'Outer String data';

// Component will only re-render when prop or state value change
// Props -> Immutable
// State -> Mutable

// Mouting -> put html in DOM
// -> constructor
// -> getDerivedStateFromProps
// -> render
// -> componentDidMount

// Updating ->
// -> getDerivedStateFromProps
// -> shouldComponentUpdate
// -> render
// -> getSnapshotBeforeUpdate
// -> componentDidUpdate

// Unmount ->
// -> componentWillUnmount

// Error ->
// -> getDerivedStateFromError
// -> componentDidCatch

// develop

// hooks -> advance react concept

// Life cycle methods
class App extends Component {
  headerRef = createRef();
  // state = {
  //     greet: 'Hello'
  // }

  // call only once
  constructor(props) {
    console.log('constructor');
    super(props);

    // to define state
    // call api
    // bnd function

    this.state = {
      hasError: false,
      greet: 'Hello',
      greetUser: `Hello, ${props.firstName}`,
    };

    // this.clickMe = this.clickMe.bind(this);
  }

  //
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    return {
      greetUser: `Hello, ${props.firstName}`,
    };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.log(error, info);
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true;
  }

  // all only once
  componentDidMount() {
    console.log('componentDidMount');
    console.log(document.getElementById('header'));
    console.log(this.headerRef.current);
    // registerEvent
    // fetch data
    // modify dom element

    document.addEventListener('copy', () => {
      console.log('copied...');
    });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    return 10;
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    console.log('componentDidUpdate');
    console.log(snapShot);
  }

  g;

  changeOuterData = () => {
    outerData = 'Inner Data';
  };

  clickMe = () => {
    this.setState({
      greet: 'Hola',
    });
  };

  render() {
    console.log('render');
    const { firstName, age } = this.props;
    const { greet, hasError } = this.state;
    if (hasError) {
      return (
        <h1>
          Something went wrong pls try after some time
        </h1>
      );
    }
    return (
      <>
        <h1 id="header" ref={this.headerRef}>
          Hello
        </h1>
        <h1>{firstName}</h1>
        <h2>{age}</h2>
        <p>{this.state.greet}</p>
        <p>{this.state.greetUser}</p>

        <button type="button" onClick={this.clickMe}>
          Click Me
        </button>

        <p>{outerData}</p>
        <button
          type="button"
          onClick={this.changeOuterData}
        >
          Change Outer Data
        </button>
        {greet === 'Hello' && <Test />}
      </>
    );
  }
}

App.propTypes = {
  firstName: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

export default App;

// import React from 'react';
// import PropTypes from 'prop-types';

// // Function component

// // Class Component

// const App = ({ firstName, age }) => (
//   <>
//     <h1 className="header">Hello</h1>
//     <h1>{firstName}</h1>
//     <h2>{age}</h2>
//     <input type="password" />
//   </>
// );

// App.propTypes = {
//   firstName: PropTypes.string.isRequired,
//   age: PropTypes.number.isRequired,
// };

// export default App;
