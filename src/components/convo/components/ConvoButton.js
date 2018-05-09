import React, { Component } from 'react';
// import PropTypes from 'prop-types';
const classNames = require('classnames');

class ConvoButton extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <button className={ classNames({selected: this.props.alt, disabled: this.props.disabled, correct: this.props.altcorrect}) } value={this.props.value} onClick={this.props.select}>{this.props.button}</button>
      </div>
    );
  }
}

//Works with or without below
// ConvoButton.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default ConvoButton;
