import React, { Component } from 'react';
// import PropTypes from 'prop-types';
const classNames = require('classnames');

let outer = {
  border: '1px solid #000',
  marginTop: '25px',
  borderRadius: '5px',
  height: '10px',
  margin: '25px'
};

let inner = {
  background: '#000',
  height: '25px'
};

class Gauge extends Component {

  render() {
    return (
      <div style={outer}>
        <div style={ { transition: 'all .3s', background: 'green', height: '10px', width: `${ this.props.width }%` } }></div>
      </div>
    );
  }
}

//Works with or without below
// Gauge.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default Gauge;
