import { Tab, Tabs } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { FaEarthAmericas, FaUpload } from "react-icons/fa6";
import useModels from "../../../../hooks/model/useModels";
import ModelCard from "./ModelCard";
import ModelCardLoading from "./ModelCardLoading";

export default function ModelsPopupList() {
  const { data, isLoading, isError, error } = useModels();

  const publicModels = data?.public_models || [];
  const editedModels = data?.edited_models || [];
  const uploadedModels = data?.uploaded_models || [];

  const defaultLoadingCards = 12;

  return (
    <div className="flex w-full items-center flex-col p-2">
      <Tabs color="primary" size="lg" radius="full">
        <Tab
          key="publicModels"
          title={
            <div className="flex items-center space-x-2">
              <FaEarthAmericas />
              <span>Public Models</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {isLoading
              ? Array.from({ length: defaultLoadingCards }, (_, index) => (
                  <ModelCardLoading key={index} />
                ))
              : publicModels.map((model, index) => (
                  <ModelCard
                    key={index}
                    title={model.title}
                    file={model.file}
                    id={model.id}
                    createdAt={model.created_at}
                    isPublicModel={true}
                  />
                ))}
          </div>
        </Tab>
        <Tab
          key="editedModels"
          title={
            <div className="flex items-center space-x-2">
              <FaRegEdit />
              <span>Edited Models</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2 xl:grid-cols-4">
            {isLoading
              ? Array.from({ length: defaultLoadingCards }, (_, index) => (
                  <ModelCardLoading key={index} />
                ))
              : editedModels.map((model, index) => (
                  <ModelCard
                    key={index}
                    title={model.title}
                    file={model.file}
                    displayName={model.display_name}
                    id={model.id}
                    createdAt={model.created_at}
                    isPublicModel={false}
                    isEditModel={true}
                  />
                ))}
          </div>
        </Tab>
        <Tab
          key="uploadedModels"
          title={
            <div className="flex items-center space-x-2">
              <FaUpload />
              <span>Upload Models</span>
            </div>
          }
        >
          {/* <Link to="/dashboard/models/">
            <p className="font-bold text-blue-500 underline">
              Click here for upload new model.
            </p>
          </Link> */}
          <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2 xl:grid-cols-4">
            {isLoading
              ? Array.from({ length: defaultLoadingCards }, (_, index) => (
                  <ModelCardLoading key={index} />
                ))
              : uploadedModels.map((model, index) => (
                  <ModelCard
                    key={index}
                    title={model.title}
                    file={model.file}
                    id={model.id}
                    createdAt={model.created_at}
                    isPublicModel={false}
                  />
                ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
