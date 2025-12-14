const IconChevronUp = ({ className, width = 18, height = 18 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M4.5 11.25L9 6.75L13.5 11.25"
        stroke="#050505"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      />
    </svg>
  );
};

export default IconChevronUp;
