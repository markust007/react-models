import React, { Component } from 'react';
// import PropTypes from 'prop-types';
const classNames = require('classnames');

class NextBtn extends Component {

  render() {
    return (
      <button onClick={this.props.next}>Next</button>
    );
  }
}

//Works with or without below
// NextBtn.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default NextBtn;
