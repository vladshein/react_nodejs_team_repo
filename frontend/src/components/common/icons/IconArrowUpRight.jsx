const IconArrowUpRight = ({
  className,
  width = 16,
  height = 16,
  stroke = 'currentColor',
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}>
      <path
        d="M4.66699 11.3332L11.3337 4.6665"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      />
      <path
        d="M4.66699 4.6665H11.3337V11.3332"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      />
    </svg>
  );
};

export default IconArrowUpRight;
