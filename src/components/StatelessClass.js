import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class StatelessClass extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.message}</h2>
      </div>
    );
  }
}

//Works with or without below
// StatelessClass.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default StatelessClass;
