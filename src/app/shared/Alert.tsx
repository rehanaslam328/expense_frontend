/** @format */

import { ToastContainer, toast, ToastPosition } from "react-toastify";

const options = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

type IProps = {
  message: string;
  type?: "success" | "error" | "info";
  position?: ToastPosition;
  autoClose?: boolean;
  draggable?: boolean;
  hideProgressBar?: boolean;
};
type toastProps = Pick<IProps, "message" | "position" | "type">;

export const Container = () => (
  <ToastContainer
    position="top-center"
    autoClose={1500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    // pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export const Toast = ({ message, position = "top-center", type = "success" }: toastProps) => {
  if (type === "success")
    return toast.success(message, {
      position,
      ...options,
    });
  else if (type === "info")
    return toast.info(message, {
      position,
      ...options,
    });
  return toast.error(message, {
    position,
    ...options,
  });
};

export const AlertBox = ({ message, type = "error" }: IProps) => Toast({ message, type });
