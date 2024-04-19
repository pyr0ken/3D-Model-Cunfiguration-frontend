import { useEffect } from "react";
import Card from "./Card";
import CardLoading from "./CardLoading";
import useModels from "../../hooks/model/useModels";
import { showAlert } from "../Core/utils";
import { ToastContainer } from "react-toastify";

export default function Models() {
  const { data: models, isLoading, isError, error } = useModels();

  const defaultLoadingCards = 10;

  return (
    <div className="mx-5 my-3 flex w-full flex-col">
      <ToastContainer />
      <div className="grid grid-cols-1 gap-10 overflow-y-auto sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: defaultLoadingCards }, (_, index) => (
              <CardLoading key={index} />
            ))
          : isError
            ? showAlert("error", error.message)
            : models.map((model) => (
                <Card
                  key={model.id}
                  title={model.title}
                  file={model.file}
                  id={model.id}
                />
              ))}
      </div>
    </div>
  );
}
