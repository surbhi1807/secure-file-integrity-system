import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

export type ToastType = "success" | "error" | "warning";

interface NotificationToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

export function NotificationToast({ 
  type, 
  message, 
  onClose, 
  duration = 5000 
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-950/30 border-green-500 dark:border-green-600";
      case "error":
        return "bg-red-50 dark:bg-red-950/30 border-red-500 dark:border-red-600";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-500 dark:border-yellow-600";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
    }
  };

  return (
    <div
      className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      }`}
    >
      <div
        className={`flex items-center gap-3 p-4 rounded-xl border-2 shadow-lg max-w-md ${getToastStyles()}`}
      >
        {getIcon()}
        <p className="font-['Inter'] text-gray-900 dark:text-white flex-1">
          {message}
        </p>
        <button
          type="button"
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
          title="Close notification"
          aria-label="Close notification"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}
