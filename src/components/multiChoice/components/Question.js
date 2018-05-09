import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ question }) => {

  return (
    <div>
      <h2>{question}</h2>
    </div>
  );

}

Question.propTypes = {
  question: PropTypes.string.isRequired
}

export default Question;
