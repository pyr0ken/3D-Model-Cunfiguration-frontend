import { toast } from "react-toastify";
import moment from "moment";

export const showAlert = (type, message) => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const formatISODate = (isoDateString) => {
  const date = new Date(isoDateString);
  const formattedDate =
    date.toLocaleDateString() + " " + date.toLocaleTimeString();
  return formattedDate;
};

export const relativeTimeFromNow = (dateTime) => {
  return moment(dateTime).fromNow();
};

export const fileSizeInMegabytes = (bytes) => {
  return bytes / Math.pow(1024, 2);
};

export const isValidFileTypeByExtension = (fileExtension) => {
  // List of allowed file extensions for GLB, GLTF, and OBJ
  const allowedExtensions = ["glb", "gltf", "obj"];

  // Check if the file extension is in the allowed list
  return allowedExtensions.includes(fileExtension);
};

export const copyText = async (text) => {
  return await navigator.clipboard.writeText(text);
};

export const variants = {
  close: {
    x: -300,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 100,
  },
};
