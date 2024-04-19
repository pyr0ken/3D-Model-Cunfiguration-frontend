// import MouseTracker from "../Models/MouseTracker";
import Navigation from "./Navigation";
import Model from "../Models/Model";
import { useParams } from "react-router-dom";
import useModel from "../../hooks/model/useModel";

export default function Editor() {
  const params = useParams();
  const modelId = params.id;

  const { data: model, isLoading, isError } = useModel(modelId);

  let content;
  if (isLoading) {
    content = <p className="text-white">Loading</p>;
  } else if (isError) {
    content = <p className="text-white">Error</p>;
  } else {
    content = <Model file={model.file} className="h-screen w-screen" />;
  }

  return (
    <main className="relative flex h-screen w-full flex-row">
      {/* <MouseTracker /> */}
      <Navigation />
      <div className="flex-1 bg-leva-1/50 bg-[linear-gradient(to_right,#8c8c8c20_1px,transparent_1px),linear-gradient(to_bottom,#8c8c8c20_1px,transparent_1px)] bg-[size:30px_30px]">
        {content}
      </div>
    </main>
  );
}
