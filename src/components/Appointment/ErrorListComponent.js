import React from 'react';
import PropTypes from 'prop-types';

const ErrorList = ({ errors }) => {
  console.log('errors', errors);
  return (
    <div className="error-list">
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index} className="error-item">
              <strong>{error.path}:</strong> {error.msg}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ErrorList.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.string,
      msg: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ErrorList;
