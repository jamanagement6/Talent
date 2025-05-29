import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  { useCallback } from "react";

const useToast = () => {
  const notify = useCallback((message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    toast(message, { type });
  }, []);

  return notify;
};

export const ToastProvider = () => <ToastContainer />;

export default useToast;
