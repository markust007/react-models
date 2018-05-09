import React from 'react';
import PropTypes from 'prop-types';

const style = {
  background: '#000',
  padding: '15px',
  color: '#fff',
  fontSize: '1.5rem',
  textAlign: 'center'
}
const h2Style = {
  margin: '0'
}

const Title = ({ title }) => {

  return (
    <div style={style}>
      <h2 style={h2Style}>{title}</h2>
    </div>
  );

}

Title.propTypes = {
  title: PropTypes.string.isRequired
}

export default Title;
