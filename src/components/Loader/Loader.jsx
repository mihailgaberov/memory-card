import React from 'react';
import styles from './Loader.module.scss';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
      <div>{message}</div>
    </div>
  );
};

export default Loader;
