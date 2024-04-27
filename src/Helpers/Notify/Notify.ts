import { toast } from "react-toastify";
export const notify = (text: string, type?: string) => {
    switch (type) {
      case 'success':
        toast.success(text);
        break;
      case 'error':
        toast.error(text);
        break;
      case 'info':
        toast.info(text);
        break;
      default:
        toast(text);
    }
  };