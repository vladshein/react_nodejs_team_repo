import styles from './SubTitle.module.css';

const SubTitle = ({ text = 'SubTitle component', align = 'center', className = '' }) => {
  const alignClass = align === 'left' ? styles.left : '';
  return (
    <>
      <p className={`${styles.subtitle} ${alignClass} ${className}`.trim()}>{text}</p>
    </>
  );
};

export default SubTitle;
