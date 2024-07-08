import { Button } from "@nextui-org/react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import useDeleteModel from "../../../hooks/model/useDeleteModel";
import useDeleteEditModel from "../../../hooks/model/useDeleteEditModel";
import useEditedModels from "../../../hooks/model/useEditedModels";
import useUploadedModels from "../../../hooks/model/useUploadedModels";
import {
  fileSizeInMegabytes,
  formatISODate,
  relativeTimeFromNow,
  showAlert,
} from "../../Core/utils";
import UploadModelModal from "./UploadModelModal";
import ViewModelModal from "./ViwsModelModal";
import {useNavigate} from "react-router-dom";

export default function ModelsList() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modelFileURL, setModelFileURL] = useState(null);

  const { data: uploadedModels, isLoading, refetch } = useUploadedModels();
  const {
    data: editedModels,
    isLoading: editedModelIsLoading,
    refetch: refreshEditedModels,
  } = useEditedModels();
  const { mutate: deleteModel } = useDeleteModel();
  const { mutate: deleteEditModel } = useDeleteEditModel();

  const navigate = useNavigate();

  const handleViewModel = (modelFile) => {
    setModelFileURL(modelFile);
    setIsViewModalOpen(true);
  };

  const handleEditModel = (editModelId) => {
    navigate(`/dashboard/editor/${editModelId}/`);
  };

  const handleDeleteModel = (id) => {
    deleteModel(
      { id },
      {
        onSuccess: (data) => {
          refetch();
          refreshEditedModels();
          showAlert("success", data.detail);
        },
        onError: (error) => {
          showAlert("error", error.response?.data?.id);
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

  const handleDeleteEditModel = (id) => {
    console.log(id);
    deleteEditModel(
      { edit_model_id: id },
      {
        onSuccess: (data) => {
          refetch();
          refreshEditedModels();
          showAlert("success", data.detail);
        },
        onError: (error) => {
          console.log(error);
          showAlert("error", error.response?.data?.id);
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
    <>
      <ToastContainer />
      <div className="mx-5 mt-2 flex h-screen w-full flex-col gap-y-5 overflow-auto text-white">
        <div className="flex flex-col">
          <div className="flex items-center justify-between rounded-md bg-gradient-to-l from-leva-2 to-leva-1 p-5">
            <h1 className="text-2xl font-bold"> Uploaded Models </h1>
            <Button
              className="text-lg"
              variant="shadow"
              size="lg"
              color="primary"
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload New Model
            </Button>
          </div>
          <div className="mx-5 mt-1 overflow-y-auto rounded-lg text-gray-200">
            <>
              <div className="grid grid-cols-5 rounded-tl-lg rounded-tr-lg bg-leva-2 p-4 text-lg font-semibold">
                <p className="pl-1">Title</p>
                <p className="pl-1">Format</p>
                <p className="pl-3">Size</p>
                <p className="pl-3">Uploaded At</p>
                <p className="text-center">Options</p>
              </div>
              {isLoading ? (
                <p>Loading...</p>
              ) : uploadedModels.length > 0 ? (
                uploadedModels.map((model, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 items-center bg-leva-3 p-2 font-medium last:rounded-bl-lg last:rounded-br-lg odd:border-y-2 odd:border-leva-1"
                  >
                    <p className="pl-3">{model.title}</p>
                    <p className="pl-3">{model.format}</p>
                    <p className="pl-3">
                      {fileSizeInMegabytes(model.size).toFixed(2)} MB
                    </p>
                    <p className="pl-2">{formatISODate(model.created_at)}</p>
                    <div className="flex justify-center gap-x-2 font-mono">
                      <button
                        onClick={() => handleViewModel(model.file)}
                        className="rounded-lg bg-blue-400 p-3 text-black transition-colors hover:bg-green-500"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteModel(model.id)}
                        className="rounded-lg bg-blue-400 p-3 text-black transition-colors hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="bg-leva-2/50 p-4 text-center text-lg">
                  There Is no model exist, Let's upload ones !
                </p>
              )}
            </>
          </div>
        </div>
        <UploadModelModal
          isUploadModalOpen={isUploadModalOpen}
          setIsUploadModalOpen={setIsUploadModalOpen}
          refetch={refetch}
        />
        <ViewModelModal
          isViewModalOpen={isViewModalOpen}
          setIsViewModalOpen={setIsViewModalOpen}
          modelFileURL={modelFileURL}
        />
        <div className="flex flex-col">
          <div className="flex items-center justify-between rounded-md bg-gradient-to-l from-leva-2 to-leva-1 p-5">
            <h1 className="text-2xl font-bold"> Edited Models </h1>
          </div>
          <div className="mx-5 mb-5 mt-1 overflow-y-auto rounded-lg text-gray-200">
            <>
              <div className="grid grid-cols-5 rounded-tl-lg rounded-tr-lg bg-leva-2 p-4 text-lg font-semibold">
                <p className="pl-1">Title</p>
                <p className="pl-1">Points</p>
                <p className="pl-1">Notes</p>
                <p className="pl-3">Last Edit</p>
                <p className="text-center">Options</p>
              </div>
              {editedModelIsLoading ? (
                <p>Loading...</p>
              ) : editedModels.length > 0 ? (
                editedModels.map((editModel, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 items-center bg-leva-3 p-2 font-medium last:rounded-bl-lg last:rounded-br-lg odd:border-y-2 odd:border-leva-1"
                  >
                    <p className="pl-3">{editModel.display_name}</p>
                    <p className="pl-3">12</p>
                    <p className="pl-3">0</p>
                    <p className="pl-1">
                      {relativeTimeFromNow(editModel.created_at)}
                    </p>
                    <div className="flex justify-center gap-x-2 font-mono">
                      <button
                        onClick={() => handleEditModel(editModel.id)}
                        className="rounded-lg bg-blue-400 p-3 text-black transition-colors hover:bg-green-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEditModel(editModel.id)}
                        className="rounded-lg bg-blue-400 p-3  text-black transition-colors hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="bg-leva-2/50 p-4 text-center text-lg">
                  There Is no model exist, Let's upload ones !
                </p>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}
