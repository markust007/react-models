import React from 'react';
import PropTypes from 'prop-types';

const Stateless = ({ message }) => {

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );

}

Stateless.propTypes = {
  message: PropTypes.string.isRequired
}

export default Stateless;
