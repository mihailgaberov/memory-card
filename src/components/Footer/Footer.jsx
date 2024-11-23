import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © 2024{' '}
        <a
          href="https://github.com/mihailgaberov"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mihail Gaberov
        </a>
      </p>
    </footer>
  );
}

export default Footer;
