// import MouseTracker from "../Models/MouseTracker";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEditModelDetail from "../../hooks/model/useEditModelDetail";
import useEditorStore from "../../store/editorStore";
import Model from "./EditorModel/Model";
import CameraAi from "./CameraAi";
import EditorNavigation from "./EditorNavigation";
import OpenModel from "./OpenEditorModel/OpenModel";

export default function Editor() {
  // state
  const [screenCapture, setScreenCapture] = useState("");

  // get edit model id from url path
  const { editModelId } = useParams();

  // Editor Store
  const {
    selectedModel,
    closeModel,
    aiCameraIsOn,
    setSelectedModel,
    changeCameraStatus,
  } = useEditorStore();

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

  // const handleScreenCapture = (screenCapture) => {
  //   console.log("screenCapture:", screenCapture);
  //   setScreenCapture(screenCapture);
  // };

  return (
    <div className="bg-grid relative flex h-screen w-full overflow-hidden">
      <EditorNavigation />

      {/* {screenCapture && (
        <img
          src={screenCapture}
          alt=""
          className="ml-52"
          width={200}
          height={100}
        />
      )} */}

      {aiCameraIsOn && <CameraAi />}

      {selectedModel && !isLoading ? (
        // <ScreenCapture onEndCapture={handleScreenCapture}>
        //   {({ onStartCapture }) => (
        //     <Model
        //       onStartCapture={onStartCapture}
        //       selectedModel={selectedModel}
        //     />
        //   )}
        // </ScreenCapture>
        <Model selectedModel={selectedModel} />
      ) : (
        <div className="ml-[5.5rem] flex w-full justify-center">
          <OpenModel />
        </div>
      )}
    </div>
  );
}
