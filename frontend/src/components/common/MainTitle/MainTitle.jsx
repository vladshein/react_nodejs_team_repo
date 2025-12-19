import styles from './MainTitle.module.css';

const MainTitle = ({ title, text, align = 'center', className = '' }) => {
  const titleText = title || text || 'Main Title Component';
  const alignClass = align === 'left' ? styles.left : '';
  return (
    <>
      <h1 className={`${styles.title} ${alignClass} ${className}`.trim()}>
        {titleText.toUpperCase()}
      </h1>
    </>
  );
};

export default MainTitle;
