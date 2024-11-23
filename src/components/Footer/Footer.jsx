import React from 'react';
import styles from './Footer.module.scss';
import packageJson from '../../../package.json';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
      ©2024{' '}
        <a
          href="https://github.com/mihailgaberov"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mihail Gaberov
        </a>
        <span className={styles.version}>v{packageJson.version}</span>
      </p>
    </footer>
  );
}

export default Footer;
