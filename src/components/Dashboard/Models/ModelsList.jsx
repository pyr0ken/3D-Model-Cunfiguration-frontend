import { Button } from "@nextui-org/react";
import jMoment from "moment-jalaali";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useDeleteEditModel from "../../../hooks/model/useDeleteEditModel";
import useDeleteModel from "../../../hooks/model/useDeleteModel";
import useEditedModels from "../../../hooks/model/useEditedModels";
import useUploadedModels from "../../../hooks/model/useUploadedModels";
import useEditorStore from "../../../store/editorStore";
import {
  fileSizeInMegabytes,
  relativeTimeFromNow,
  showAlert,
} from "../../Core/utils";
import UploadModelModal from "./UploadModelModal";
import ViewModelModal from "./ViwsModelModal";

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

  const { addEditModel, setSelectedModel } = useEditorStore();

  const handleViewModel = (modelFile) => {
    setModelFileURL(modelFile);
    setIsViewModalOpen(true);
  };

  const handleEditModel = (editModel) => {
    addEditModel(editModel);
    setSelectedModel(editModel);
    navigate(`/dashboard/editor/`);
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
      <ToastContainer rtl />
      <div className="mx-5 mt-2 flex h-screen w-full flex-col gap-y-5 overflow-auto text-white">
        <div className="flex flex-col">
          <div className="flex items-center justify-between rounded-md bg-gradient-to-l from-leva-2 to-leva-1 p-5">
            <h1 className="text-2xl font-bold"> مدل های آپلود شده </h1>
            <Button
              className="text-lg"
              variant="shadow"
              size="lg"
              color="primary"
              onClick={() => setIsUploadModalOpen(true)}
            >
              آپلود مدل جدید
            </Button>
          </div>
          <div className="mx-5 mt-1 overflow-y-auto rounded-lg text-gray-200">
            <>
              <div className="grid grid-cols-5 rounded-tl-lg rounded-tr-lg bg-leva-2 p-4 text-lg font-semibold">
                <p className="pl-2">عنوان</p>
                <p className="pl-3">فرمت</p>
                <p className="pr-3">سایز</p>
                <p className="pr-3">تاریخ آپلود</p>
                <p className="text-center">گزینه ها</p>
              </div>
              {isLoading ? (
                <p className="bg-leva-2/50 p-4 text-center text-lg">
                  در حال بارگیری اطلاعات...
                </p>
              ) : uploadedModels.length > 0 ? (
                uploadedModels.map((model, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 items-center bg-leva-3 p-2 font-medium last:rounded-bl-lg last:rounded-br-lg odd:border-y-2 odd:border-leva-1"
                  >
                    <p className="pl-3">{model.title}</p>
                    <p className="pl-3">{model.format}</p>
                    <p className="space-x-1 pl-3">
                      <span>{fileSizeInMegabytes(model.size).toFixed(2)}</span>
                      <span>MB</span>
                    </p>
                    <p className="pl-2">
                      {jMoment(model.created_at).format(
                        "HH:MM - jYYYY/jMM/jDD",
                      )}
                    </p>
                    <div className="flex justify-center gap-x-2">
                      <button
                        onClick={() => handleViewModel(model.file)}
                        className="rounded-lg bg-blue-400 p-3 text-black transition-colors hover:bg-green-500"
                      >
                        نمایش
                      </button>
                      <button
                        onClick={() => handleDeleteModel(model.id)}
                        className="rounded-lg bg-blue-400 p-3 text-black transition-colors hover:bg-red-500"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="bg-leva-2/50 p-4 text-center text-lg">
                  هیچ مدلی در اینجا وجود ندارد. همین الان میتوانید یک مدل آپلود
                  کنید!
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
            <h1 className="text-2xl font-bold"> مدل های ویرایش شده </h1>
          </div>
          <div className="mx-5 mb-5 mt-1 overflow-y-auto rounded-lg text-gray-200">
            <>
              <div className="grid grid-cols-5 rounded-tl-lg rounded-tr-lg bg-leva-2 p-4 text-lg font-semibold">
                <p className="pl-1">عنوان</p>
                <p className="pl-1">تعداد نقطه ها</p>
                <p className="pl-1">تعداد یادداشت ها</p>
                <p className="pl-3">آخرین تاریخ ویرایش</p>
                <p className="text-center">گزینه ها</p>
              </div>
              {editedModelIsLoading ? (
                <p className="bg-leva-2/50 p-4 text-center text-lg">
                  در حال بارگیری اطلاعات...
                </p>
              ) : editedModels.length > 0 ? (
                editedModels.map((editModel, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 items-center bg-leva-3 p-2 font-medium last:rounded-bl-lg last:rounded-br-lg odd:border-y-2 odd:border-leva-1"
                  >
                    <p className="pl-3">{editModel.display_name}</p>
                    <p className="pl-3">{editModel.points_count}</p>
                    <p className="pl-3">{editModel.notes_count}</p>
                    <p className="pl-1">
                      {relativeTimeFromNow(editModel.last_edit)}
                    </p>
                    <div className="flex justify-center gap-x-2">
                      <button
                        onClick={() => handleEditModel(editModel)}
                        className="rounded-lg bg-blue-400 p-3 text-black transition-colors hover:bg-green-500"
                      >
                        شروع ویرایش
                      </button>
                      <button
                        onClick={() => handleDeleteEditModel(editModel.id)}
                        className="rounded-lg bg-blue-400 p-3  text-black transition-colors hover:bg-red-500"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="bg-leva-2/50 p-4 text-center text-lg">
                  هیچ مدلی در اینجا وجود ندارد. همین الان میتوانید یک مدل را
                  ویرایش کنید !
                </p>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
}
