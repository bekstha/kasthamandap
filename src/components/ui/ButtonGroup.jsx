const ButtonGroup = ({ children, className }) => {
  return (
    <div className={`mt-8 md:mt-14 flex gap-3 justify-center ${className}`}>
      {children}
    </div>
  );
};

export default ButtonGroup;
