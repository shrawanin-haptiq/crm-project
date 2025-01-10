// import React from 'react';
// import styles from './Button.module.css';

// const Button = () => {
//   return (
//     <div className={styles.container}>
//       <button className={styles.button}>Back to Home</button>
//     </div>
//   );
// };

// export default Button;

import React from 'react';
import PropTypes from 'prop-types'; // For prop type validation
import styles from './Button.module.css';

const Button = ({ label, onClick }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired, // Ensures label is always passed
  onClick: PropTypes.func,           // Optional click handler
};

Button.defaultProps = {
  onClick: () => {},                 // Default no-op function
};

export default Button;
