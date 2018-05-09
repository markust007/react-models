import React from 'react';
import PropTypes from 'prop-types';

const Customer = ({ customer }) => {

  return (
    <div>
      <h2>{customer}</h2>
    </div>
  );

}

Customer.propTypes = {
  customer: PropTypes.string.isRequired
}

export default Customer;
