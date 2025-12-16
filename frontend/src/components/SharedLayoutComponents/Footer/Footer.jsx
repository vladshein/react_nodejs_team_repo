import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

import Logo from '../Logo/Logo.jsx';
import NetworkLinks from '../NetworkLinks/NetworkLinks.jsx';
import Copyright from '../Copyright/Copyright.jsx';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <Logo variant="dark" />
        <NetworkLinks />
      </div>
      <div className={styles.bottomRow}>
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
