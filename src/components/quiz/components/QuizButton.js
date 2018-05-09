import React, { Component } from 'react';
// import PropTypes from 'prop-types';
const classNames = require('classnames');

class QuizButton extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <button className={ classNames({disabled: this.props.disabled}) } value={this.props.value} onClick={this.props.select}>{this.props.button}</button>
      </div>
    );
  }
}

//Works with or without below
// QuizButton.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default QuizButton;
