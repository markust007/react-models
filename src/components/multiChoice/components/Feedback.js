import React from 'react';
import PropTypes from 'prop-types';

const Feedback = ({ feedback }) => {

  return (
    <div>
      <p className="animated fadeIn">{feedback}</p>
    </div>
  );

}

Feedback.propTypes = {
  feedback: PropTypes.string.isRequired
}

export default Feedback;
