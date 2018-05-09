import React, { Component } from 'react';
// import PropTypes from 'prop-types';

const style = {
  listStyleType: 'none',
  cursor: 'pointer',
  margin: '2px 0',
  color: '#ddd',
  fontSize: '0.9rem',
  textAlign: 'left'
}

class Navigation extends Component {
  render() {
    return (
      <li style={style}>{this.props.direction}</li>
    );
  }
}

//Works with or without below
// Navigation.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default Navigation;
