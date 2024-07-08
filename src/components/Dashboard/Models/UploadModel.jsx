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

export default function UploadModel({ setIsUploadModalOpen, refetch }) {
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
      showAlert("error", "Please upload only one file at a time.");
      return;
    }

    const file = files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!isValidFileTypeByExtension(fileExtension)) {
      showAlert(
        "error",
        `File extension "${fileExtension}" is not allowed, Allowed extensions are: gltf, gltb, obj`,
      );
      return;
    }

    setFile(file);
  };

  const handleClick = () => {
    // Trigger the hidden file input click event
    fileInputRef.current.click();
  };

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 1) {
      showAlert("error", "Please upload only one file at a time.");
      return;
    }

    const file = files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!isValidFileTypeByExtension(fileExtension)) {
      showAlert(
        "error",
        `File extension "${fileExtension}" is not allowed, Allowed extensions are: gltf, gltb, obj`,
      );
      return;
    }

    setFile(file);
  };

  const handleUploadModel = () => {
    if (!file) {
      showAlert("error", "Please select a file to upload.");
      return;
    }
    // if (file.size > 10000000) {
    //   showAlert("error", `File size should be less than 10MB.`);
    //   return;
    // }

    const title = titleRef.current.value;
    
    if (title.length === 0) {
      showAlert("error", "The title field may not be blank.");
    }

    mutate(
      { file, title, setUploadProgress },
      {
        onSuccess: (data) => {
          // setIsUploadModalOpen(false);
          refetch();
          showAlert("success", data.detail);
        },
        onError: (error) => {
          console.log(error);
          showAlert("error", error.response?.data?.file.join());
          if (!error?.originalStatus) {
            showAlert("error", error.response?.data?.detail);
          } else if (error.originalStatus === 400) {
            showAlert("error", error.response?.data?.detail);
          } else if (error.originalStatus === 401) {
            showAlert("error", error.response?.data?.detail);
          } else {
            showAlert("error", "Failed");
          }
        },
      },
    );
  };

  return (
    <div className="flex flex-col">
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
              Drag and Drop Files Or Click Here
            </p>
            {file && (
              <div className="font-mono font-bold">
                <p>name: {file.name}</p>
                <p>size: {fileSizeInMegabytes(file.size).toFixed(2)} MB</p>
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
            placeholder="Enter title..."
            variant="faded"
            color="success"
            size="lg"
          />
          <Button onClick={handleUploadModel} color="success" variant="ghost">
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
