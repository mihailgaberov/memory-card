import React from 'react';
import styles from './Loader.module.scss';

function Loader({ message = 'Loading...' }) {
  return (
    <div className={styles.loading} data-testid="loader">
      <div className={styles.spinner} />
      <div>{message}</div>
    </div>
  );
}

export default Loader;
