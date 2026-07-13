import React from "react";

const Loader = ({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}) => {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4",
  };

  const loader = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`
          rounded-full
          border-blue-600
          border-t-transparent
          animate-spin
          ${sizes[size]}
        `}
      />

      {text && (
        <p className="text-gray-500 text-sm">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;