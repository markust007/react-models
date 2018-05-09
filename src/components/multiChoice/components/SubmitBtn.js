import React, { Component } from 'react';
// import PropTypes from 'prop-types';
const classNames = require('classnames');

class SubmitBtn extends Component {

  render() {
    return (
      <button onClick={this.props.submit}>Submit</button>
    );
  }
}

//Works with or without below
// SubmitBtn.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default SubmitBtn;
