import React, { Component } from 'react';
// import PropTypes from 'prop-types';
const classNames = require('classnames');

class FinishBtn extends Component {

  render() {
    return (
      <button onClick={this.props.finish}>Finish</button>
    );
  }
}

//Works with or without below
// FinishBtn.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default FinishBtn;
