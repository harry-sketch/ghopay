import { toast as toastify } from "react-toastify";
import type { ToastContentProps } from "react-toastify/unstyled";
import { taostIcons } from "~/app/_assets/toastIcons";

interface ToastData {
  title: string;
  message: string;
}

export const useToast = () => {
  const toast = {
    success: (data: ToastData) => {
      toastify.success(Toast, {
        data: {
          title: data.title,
          message: data.message,
        },
        ariaLabel: data.title,
        icon: false,
        hideProgressBar: true,
        closeButton: false,
        style: {
          padding: 0,
        },
      });
    },

    error: (data: ToastData) => {
      toastify.error(Toast, {
        data: {
          title: data.title,
          message: data.message,
        },
        ariaLabel: data.title,
        icon: false,
        hideProgressBar: true,
        closeButton: false,
        style: {
          padding: 0,
        },
      });
    },

    info: (data: ToastData) => {
      toastify.info(Toast, {
        data: {
          title: data.title,
          message: data.message,
        },
        ariaLabel: data.title,
        icon: false,
        hideProgressBar: true,
        closeButton: false,
        style: {
          padding: 0,
        },
      });
    },
  };

  return { toast };
};

const Toast = ({
  closeToast,
  toastProps,
  data,
}: ToastContentProps<ToastData>) => {
  const { type } = toastProps;
  return (
    <div
      className={`flex w-full items-start justify-between gap-2 rounded-md border p-4 ${type === "success" ? "border-green-500 bg-green-400" : "border-red-500 bg-red-400"}`}
    >
      <div>{type === "success" ? taostIcons.success : taostIcons.error}</div>
      <div className="">
        <div className="font-bricolage text-base font-medium text-white">
          {data.title}
        </div>
        <div className="font-bricolage text-sm font-normal text-white">
          {data.message}
        </div>
      </div>
      <button type="button" onClick={closeToast}>
        {taostIcons.close}
      </button>
    </div>
  );
};
