import styles from './Button.module.css';

const Button = ({
  onClick,
  variant = 'filled',
  type = 'button',
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      data-variant={variant}
      type={type}
      className={`${styles.btn} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
