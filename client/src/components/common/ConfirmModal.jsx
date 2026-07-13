import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Button from "./Button";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  variant = "danger",
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

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">

        <div className="p-6">

          <div className="flex justify-center mb-5">

            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">

              <FaExclamationTriangle
                size={32}
                className="text-red-600"
              />

            </div>

          </div>

          <h2 className="text-2xl font-bold text-center">
            {title}
          </h2>

          <p className="text-gray-500 text-center mt-3">
            {message}
          </p>

          <div className="flex justify-center gap-4 mt-8">

            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              {cancelText}
            </Button>

            <Button
              variant={variant}
              onClick={onConfirm}
              loading={loading}
            >
              {confirmText}
            </Button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ConfirmModal;