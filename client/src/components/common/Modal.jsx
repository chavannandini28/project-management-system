import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-2xl",
  showFooter = false,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}

      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}

      <div
        className={`
          relative
          bg-white
          rounded-xl
          shadow-2xl
          w-full
          mx-4
          ${width}
          animate-[fadeIn_.2s_ease-in-out]
        `}
      >

        {/* Header */}

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <FaTimes size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          {children}

        </div>

        {/* Footer */}

        {showFooter && (
          <div className="border-t p-5">

            {footer}

          </div>
        )}

      </div>

    </div>
  );
};

export default Modal;