import React, { Component } from 'react';
// import PropTypes from 'prop-types';
const classNames = require('classnames');

class Final extends Component {

  render() {
    return (
      <div>
        {this.props.correct >= 8 &&
          <div className="passing">
            <p>You got {this.props.correct * 10}% correct</p>
            <p>{this.props.passing}</p>
          </div>
        }
        {this.props.correct < 8 &&
        <div className="failing">
          <p>You got {this.props.correct * 10}% correct</p>
          <p>{this.props.failing}</p>
          <button onClick={this.props.tryAgain}>Try Again</button>
        </div>
        }
      </div>
    );
  }
}

//Works with or without below
// Final.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default Final;
