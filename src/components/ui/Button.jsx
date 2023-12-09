const btnClasses = "w-28 md:w-32 text-lg rounded-md duration-200";

const colors = {
  blue: "border-blue-600 bg-blue-600 hover:bg-blue-500 hover:border-blue-500",
  orange:
    "border-orange-600 bg-orange-600 hover:bg-orange-500 hover:border-orange-500 text-white",
  pink: "border-pink-600 bg-pink-600 hover:bg-pink-500 hover:border-pink-500",
  red: "border-red-600 bg-red-600 hover:bg-red-500 hover:border-red-500", 
};

const hoverCases = {
  red:"hover:bg-red-500 hover:border-red-500",
  green:"hover:bg-green-500 hover:border-green-500",
  orange:"hover:bg-orange-500 hover:border-orange-500"
}

const sizes = {
  small: " p-1 text-sm",
  default: "p-3 text-sm",
  large: "px-5 py-2",
};

const Button = ({
  children,
  href,
  className,
  title,
  color ="orange",
  size = "default",
  isExternal = false,
  outlined = false,
  onClick,
  hover="red",
  disabled = false, 
  id,
}) => {
  let colorClasses = colors[color];
  let sizeClasses = sizes[size];
  let hoverClasses = !disabled ? hoverCases[hover] : '';

  if (href)
    return (
      <a
        href={href}
        className={`${btnClasses} ${colorClasses} ${sizeClasses} ${className}`}
        title={title}
        target={isExternal ? "_blank" : ""}
        rel={isExternal ? "noopener noreferrer" : ""}
        disabled={disabled} 
      >
        {children}
      </a>
    );

  return (
    <button
      title={title}
      className={`border ${btnClasses} ${colorClasses} ${sizeClasses} ${
        outlined
        ? `${hoverClasses} ${
          disabled ? '' : 'hover:!text-white'
        }`
      : ''
      } ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => onClick && onClick()}
      id={id}
      disabled={disabled}  
    >
      {children}
    </button>
  );
};

export default Button;
