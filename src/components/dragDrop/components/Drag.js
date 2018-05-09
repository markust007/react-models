import React, { Component } from 'react';
// import PropTypes from 'prop-types';
const classNames = require('classnames');

class Drag extends Component {

  render() {
    return (
        <button className="drag" draggable="true" id={this.props.id} onDragStart={this.props.drag} value={this.props.value}>{this.props.text}</button>
    );
  }
}

//Works with or without below
// Drag.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default Drag;
