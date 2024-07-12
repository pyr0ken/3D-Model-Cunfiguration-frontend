import { toast } from "react-toastify";
import moment from "jalali-moment";

export const showAlert = (type, message) => {
  toast[type](message, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const getFirstWords = (text, wordsNumber) => {
  const words = text.split(" ");
  const firstWords = words.slice(0, wordsNumber).join(" ");
  return words.length > wordsNumber ? `${firstWords}...` : firstWords;
};

export const formatDateTime = (isoDateString) => {
  return moment(isoDateString).locale("fa").format("HH:MM - jYYYY/jMM/jDD");
};

export const relativeTimeFromNow = (dateTime) => {
  return moment(dateTime).locale("fa").fromNow();
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
