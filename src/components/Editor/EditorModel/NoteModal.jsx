import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useRef } from "react";
import useAddNote from "../../../hooks/model/useAddNote";
import useDeleteNote from "../../../hooks/model/useDeleteNote";
import useDeletePoint from "../../../hooks/model/useDeletePoint";
import useEditorStore from "../../../store/editorStore";

export default function NoteModal({
  selectedPoint,
  isNoteModalOpen,
  setIsNoteModalOpen,
  refetch,
}) {
  const { mutate: addNote } = useAddNote();
  const { mutate: deletePoint } = useDeletePoint();
  const { mutate: deleteNote } = useDeleteNote();

  const { selectedModel } = useEditorStore();

  const noteRef = useRef(null);

  const handleAddNote = (event) => {
    const text = noteRef.current.value;
    if (text) {
      addNote(
        {
          edit_model_id: selectedModel.id,
          point_id: selectedPoint.id,
          note: text,
        },
        {
          onSuccess: (res) => refetch(),
          onError: (err) => console.log(err),
        },
      );
      handleCloseModal();
    }
  };

  const handleDeletePoint = () => {
    deletePoint(
      {
        edit_model_id: selectedModel.id,
        point_id: selectedPoint.id,
      },
      {
        onSuccess: (res) => refetch(),
        onError: (err) => console.log(err),
      },
    );
    handleCloseModal();
  };

  const handleDeleteNote = () => {
    deleteNote(
      { 
        edit_model_id: selectedModel.id,
        point_id: selectedPoint.id
      },
      {
        onSuccess: (res) => refetch(),
        onError: (err) => console.log(err),
      },
    );
    handleCloseModal();
  };

  const getPointNote = () => {
    if (selectedPoint.note) {
      return selectedPoint.note;
    }
    return "";
  };

  const handleCloseModal = () => {
    setIsNoteModalOpen(false);
  };

  return (
    <Modal
      isOpen={isNoteModalOpen}
      onClose={handleCloseModal}
      placement="top-center"
      className="text-white dark"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Add & Edit Note
        </ModalHeader>
        <ModalBody>
          <Textarea
            ref={noteRef}
            autoFocus
            label="Note"
            defaultValue={getPointNote}
            placeholder="Enter your note..."
            variant="flat"
          />
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <div className="space-x-2">
            <Button color="danger" onClick={handleDeletePoint}>
              Delete Point
            </Button>
            <Button color="danger" onClick={handleDeleteNote}>
              Delete Note
            </Button>
          </div>
          <Button color="primary" onClick={handleAddNote}>
            Save Note
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
