import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  disabled = false,
  error,
  icon,
  className = "",
}) => {
  return (
    <div className="mb-5">

      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}

          {required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}

      <div className="relative">

        {icon && (
          <div className="absolute left-3 top-3 text-gray-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full
            rounded-lg
            border
            px-4
            py-3
            outline-none
            transition
            duration-200
            ${
              icon ? "pl-11" : ""
            }
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-300"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }
            ${
              disabled
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-white"
            }
            ${className}
          `}
        />

      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

export default Input;