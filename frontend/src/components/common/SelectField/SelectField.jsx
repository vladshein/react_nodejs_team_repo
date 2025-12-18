import Select from 'react-select';
import styles from './SelectField.module.css';

const SelectField = ({ name, value, onChange, onBlur, options = [], placeholder = '' }) => {
  const selected = options.find((o) => o.value === value) || null;

  return (
    <Select
      name={name}
      options={options}
      value={selected}
      onChange={(opt) => onChange && onChange(opt ? opt.value : null)}
      onBlur={onBlur}
      placeholder={placeholder}
      unstyled
      classNamePrefix="selectField"
      className={styles.selectField}
    />
  );
};

export default SelectField;
