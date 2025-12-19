import styles from './TextAreaField.module.css';

const TextAreaField = ({
  name,
  value,
  onChange,
  onBlur,
  currentLength,
  maxLength,
  placeholder,
  isError,
}) => {
  return (
    <div className={styles.areaWrapper}>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        className={`${styles.textarea} ${isError ? styles.textareaError : ''}`}
      />
      <div className={`${styles.charCountWrapper} ${isError ? styles.charCountWrapperError : ''}`}>
        <span className={`${currentLength > 0 ? styles.charCount : ''}`}>{currentLength}</span>
        <span className={styles.maxChar}>/{maxLength}</span>
      </div>
    </div>
  );
};

export default TextAreaField;
