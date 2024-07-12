import { useRef, useState } from "react";
import {
  showAlert,
  fileSizeInMegabytes,
  isValidFileTypeByExtension,
} from "../../Core/utils";
import { FaUpload } from "react-icons/fa6";
import { Button, Input } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import useUploadModel from "../../../hooks/model/useUploadModel";

export default function UploadModel({ setIsUploadModalOpen, uploadedModelRefetch }) {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // State to hold upload progress

  const dragRef = useRef();
  const fileInputRef = useRef(); // Reference to the hidden file input
  const titleRef = useRef();

  const { mutate } = useUploadModel();

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 1) {
      showAlert("error", "لطفا فقط یک فایل را برای آپلود انتخاب کنید.");
      return;
    }

    const file = files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!isValidFileTypeByExtension(fileExtension)) {
      showAlert(
        "error",
        `پسوند فایل "${fileExtension}" مجاز نیست، پسوندهای مجاز عبارتند از: gltf، glb`,
      );
      return;
    }

    setFile(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 1) {
      showAlert("error", "لطفا فقط یک فایل را برای آپلود انتخاب کنید.");
      return;
    }

    const file = files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!isValidFileTypeByExtension(fileExtension)) {
      showAlert(
        "error",
        `پسوند فایل "${fileExtension}" مجاز نیست، پسوندهای مجاز عبارتند از: gltf، glb`,
      );
      return;
    }

    setFile(file);
  };

  const handleUploadModel = () => {
    if (!file) {
      showAlert("error", "لطفا یک فایل را برای آپلود انتخاب کنید");
      return;
    }

    const title = titleRef.current.value;

    if (!title) {
      showAlert("error", "لطفا عنوان مدل را وارد کنید");
    }

    mutate(
      { file, title, setUploadProgress },
      {
        onSuccess: (data) => {
          uploadedModelRefetch();
          showAlert("success", data.detail);
        },
        onError: (error) => {
          if (error.response.status === 400) {
            showAlert("error", error.response?.data?.detail);
          } else {
            showAlert("error", "مشکلی در ارسال اطلاعات پیش آمده است");
          }
        },
      },
    );
  };

  return (
    <div className="flex flex-col rtl font-vazirmatn">
      <div
        ref={dragRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick} // Click handler to trigger file input
        className={`mx-5 my-8 border-3 border-dashed p-24 transition-colors ${dragOver ? "border-green-600 bg-green-200 text-black" : "cursor-copy border-gray-400 text-white"}`}
      >
        <div className="flex flex-col items-center justify-center">
          <FaUpload className="m-3" />
          <div className="flex flex-col gap-2">
            <p className="select-none text-center">
              فایل ها را بکشید و رها کنید یا اینجا کلیک کنید.
            </p>
            {file && (
              <div className="mt-2 font-bold">
                <p>اسم: {file.name}</p>
                <p className="space-x-1">
                  <span>سایز: {fileSizeInMegabytes(file.size).toFixed(2)}</span>
                  <span>MB</span>
                </p>
              </div>
            )}
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFilesChange}
          style={{ display: "none" }} // Hide the file input
        />
      </div>
      <div className="mx-5 flex flex-col">
        {uploadProgress > 0 && (
          <Progress
            aria-label="Downloading..."
            size="md"
            value={uploadProgress}
            color="success"
            showValueLabel={true}
            className="mb-4 text-white"
          />
        )}
        <div className="flex flex-col gap-y-3">
          <Input
            ref={titleRef}
            className="text-white"
            placeholder="لطفا عنوان مدل را وارد کنید..."
            variant="faded"
            color="success"
            size="lg"
          />
          <Button onClick={handleUploadModel} className="text-lg" size="lg" color="success" variant="ghost">
            آپلود
          </Button>
        </div>
      </div>
    </div>
  );
}
