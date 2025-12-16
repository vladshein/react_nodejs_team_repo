import styles from './NetworkLinks.module.css';
import IconFacebook from '../../common/icons/IconFacebook.jsx';
import IconInstagram from '../../common/icons/IconInstagram.jsx';
import IconYoutube from '../../common/icons/IconYoutube.jsx';

const NetworkLinks = () => {
  return (
    <ul className={styles.socialList}>
      <li>
        <a
          href="https://www.facebook.com/goitclub/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className={styles.socialLink}>
          <IconFacebook className={styles.socialIcon} />
        </a>
      </li>

      <li>
        <a
          href="https://www.instagram.com/goitclub/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={styles.socialLink}>
          <IconInstagram className={styles.socialIcon} />
        </a>
      </li>

      <li>
        <a
          href="https://www.youtube.com/c/GoIT"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className={styles.socialLink}>
          <IconYoutube className={styles.socialIcon} />
        </a>
      </li>
    </ul>
  );
};

export default NetworkLinks;
