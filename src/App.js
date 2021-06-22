import React, { Component } from 'react';
import PropTypes from 'prop-types';

let outerData = "Outer String data"

// Component will only re-render when prop or state value change

class App extends Component {

    // state = {
    //     greet: 'Hello'
    // }

    constructor (props) {
        super(props)

        this.state = {
            greet: 'Hello',
            greetUser: `Hello, ${props.firstName}`
        }
        
    }
    

    clickMe = () => {
      this.setState({
        greet: 'Hola'
      })
    }

    changeOuterData = () => {
        outerData = "Inner Data"
    }

    render() {
      const { firstName, age } = this.props;
      console.log('render')
      return (
        <>
          <h1 className="header">Hello</h1>
          <h1>{firstName}</h1>
          <h2>{age}</h2>
          <p>{this.state.greet}</p>
          <p>{this.state.greetUser}</p>

          <button type="button" onClick={this.clickMe}>Click Me</button>

            <p>{outerData}</p>
            <button type="button" onClick={this.changeOuterData}>Change Outer Data</button>
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
