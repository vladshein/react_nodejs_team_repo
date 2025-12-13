const IconArrowLeft = ({ className, width = 16, height = 16 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M12.7136 8.00058L3.28549 7.99956"
        stroke="#050505"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      />
      <path
        d="M7.99902 12.7141L3.28549 7.99956L8.00004 3.28602"
        stroke="#050505"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      />
    </svg>
  );
};

export default IconArrowLeft;
