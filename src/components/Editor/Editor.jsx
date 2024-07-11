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
  // Editor Store
  const {
    selectedModel,
    closeModel,
    aiCameraIsOn,
    setSelectedModel,
  } = useEditorStore();

  // useEffect(() => {
  //   if (editModel && !closeModel) {
  //     setSelectedModel(editModel);
  //   }
  // }, [editModel]);

  return (
    <div className="bg-grid relative flex h-screen w-full overflow-hidden">
      <EditorNavigation />

      {aiCameraIsOn && <CameraAi />}

      {selectedModel ? (
        <Model />
      ) : (
        <div className="mr-[5.5rem] flex w-full justify-center">
          <OpenModel />
        </div>
      )}
    </div>
  );
}
