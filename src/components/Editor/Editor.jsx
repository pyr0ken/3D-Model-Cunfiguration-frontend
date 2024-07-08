// import MouseTracker from "../Models/MouseTracker";
import Model from "../Models/Model";
import { useParams } from "react-router-dom";
import CameraAi from "./CameraAi";
import useCameraStore from "../../store/cameraStore";
import useEditModelDetail from "../../hooks/model/useEditModelDetail";
import EditorNavigation from "./EditorNavigation";
import OpenModel from "./OpenEditorModel/OpenModel";
import useEditorStore from "../../store/editorStore";
import { useEffect } from "react";

export default function Editor() {
  // get edit model id from url path
  const { editModelId } = useParams();

  // ai camera store
  const { cameraIsOn, changeCameraStatus } = useCameraStore();

  // Editor Store
  const { selectedModel, closeModel, setSelectedModel } = useEditorStore();

  // Edit model
  const {
    data: editModel,
    isLoading,
    isError,
  } = useEditModelDetail(editModelId);

  useEffect(() => {
    if (editModel && !closeModel) {
      setSelectedModel(editModel);
    }
  }, [editModel]);

  return (
    <div className="bg-grid relative flex h-screen w-full overflow-hidden">
      <EditorNavigation />

      {cameraIsOn && <CameraAi />}

      {selectedModel && !isLoading ? (
        <Model selectedModel={selectedModel} />
      ) : (
        <div className="ml-[5.5rem] flex w-full justify-center">
          <OpenModel />
        </div>
      )}
    </div>
  );
}
