import React, { Component } from 'react';
// import PropTypes from 'prop-types';
const classNames = require('classnames');

class Drop extends Component {

  render() {
    return (
        <li className="drop" id={this.props.id} onDragEnter={this.props.dragenter} onDragOver={this.props.dragover} onDrop={this.props.drop} value={this.props.value} ref={this.props.reference}></li>
    );
  }
}

//Works with or without below
// Drop.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default Drop;
