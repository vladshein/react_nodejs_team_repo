import Button from './components/common/button/Button';
import styles from './test.module.css';

const Test = () => {
  return (
    <div className="section">
      <Button className={styles.btn}>Logout</Button>
    </div>
  );
};

export default Test;
