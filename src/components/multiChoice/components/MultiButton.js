import React, { Component } from 'react';
// import PropTypes from 'prop-types';
const classNames = require('classnames');

class MultiButton extends Component {

  render() {
    return (
        <label>
          <input type="checkbox" onClick={this.props.change} value={this.props.value} />
          {this.props.text}
        </label>
    );
  }
}

//Works with or without below
// MultiButton.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default MultiButton;
