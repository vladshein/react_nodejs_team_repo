import Button from '../../common/button/Button';
import IconMinus from '../../common/icons/IconMinus';
import IconPlus from '../../common/icons/IconPlus';
import styles from './TimeInputField.module.css';

const TimeInputField = ({ value, onChange, step = 5, min = 0, max = 360 }) => {
  const numericValue = typeof value === 'number' ? value : min;

  const handleDecrement = () => {
    if (numericValue > min) {
      onChange(numericValue - step);
    }
  };

  const handleIncrement = () => {
    if (numericValue < max) {
      onChange(numericValue + step);
    }
  };

  return (
    <div className={styles.timeInput}>
      <Button
        variant="outlined"
        onClick={handleDecrement}
        disabled={numericValue <= min}
        className={styles.button}>
        <IconMinus />
      </Button>

      <span className={styles.timeValue}>{numericValue} min</span>

      <Button
        variant="outlined"
        onClick={handleIncrement}
        disabled={numericValue >= max}
        className={styles.button}>
        <IconPlus />
      </Button>
    </div>
  );
};

export default TimeInputField;
