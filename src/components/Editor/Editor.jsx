import useEditorStore from "../../store/editorStore";
import CameraAi from "./CameraAi";
import Model from "./EditorModel/Model";
import EditorNavigation from "./EditorNavigation";
import OpenModel from "./OpenEditorModel/OpenModel";

export default function Editor() {
  // Editor Store
  const {
    selectedModel,
    aiCameraIsOn,
  } = useEditorStore();

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
