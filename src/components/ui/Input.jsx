import React from "react";

const inputClasses =
  "bg-gray-100 rounded-md py-1.5 px-2 w-full text-black border-0 outline outline-1 outline-gray-600 focus:outline-blue-400 transition-all duration-100";

const InputLabel = ({ label }) => (
  <label className="block mb-1 text-sm text-left">{label}</label>
);

const Input = ({
  type = "text",
  name,
  onChange,
  min,
  max,
  value,
  placeholder,
}) => (
  <input
    type={type}
    name={name}
    className={inputClasses}
    placeholder={placeholder}
    value={value}
    min={min}
    max={max}
    onChange={onChange}
  />
);

const Textarea = ({ rows = 4, onChange, value }) => (
  <textarea
    rows={rows}
    className={inputClasses}
    value={value}
    onChange={onChange}
  ></textarea>
);

export { Input, InputLabel, Textarea };
