import React, { Component } from 'react';
// import PropTypes from 'prop-types';


class Stateful extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: "Hello world"
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState(x) {
    this.setState({
      message: x
    })
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <button onClick={ () => {this.changeState("Hi")} }>{this.props.button}</button>
      </div>
    );
  }
}

// Stateful.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default Stateful;
