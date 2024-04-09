import { useEffect } from "react";
import Card from "./Card";
import CardLoading from "./CardLoading";
import useModels from "../../hooks/model/useModels";

export default function Models() {
  const { data: models, isLoading, isError } = useModels();

  const defaultLoadingCards = 10;

  let content;
  if (isLoading) {
    content = Array.from({ length: defaultLoadingCards }, (_, index) => (
      <CardLoading key={index} />
    ));
  } else if (isError) {
    content = <p className="text-white">Failed</p>;
  } else {
    content = models.map((model) => (
      <Card
        key={model.id}
        title={model.title}
        file={model.file}
        id={model.id}
      />
    ));
  }

  return (
    <div className="mx-5 my-3 flex w-full flex-col">
      <div className="grid grid-cols-1 gap-10 overflow-y-auto sm:grid-cols-2 xl:grid-cols-4">
        {content}
      </div>
    </div>
  );
}
