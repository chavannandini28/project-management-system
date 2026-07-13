import React from "react";

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 5,
  required = false,
  disabled = false,
  error,
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

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          w-full
          rounded-lg
          border
          px-4
          py-3
          resize-none
          outline-none
          transition
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

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

export default TextArea;