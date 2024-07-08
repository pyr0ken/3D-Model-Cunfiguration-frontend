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
import useAddNote from "../../hooks/model/useAddNote";
import useDeleteNote from "../../hooks/model/useDeleteNote";
import useDeletePoint from "../../hooks/model/useDeletePoint";

export default function NoteModal({
  selectedPoint,
  isNoteModalOpen,
  setIsNoteModalOpen,
}) {
  const { mutate: addNote } = useAddNote();
  const { mutate: deletePoint } = useDeletePoint();
  const { mutate: deleteNote } = useDeleteNote();

  const noteRef = useRef(null);

  const handleAddNote = (event) => {
    const text = noteRef.current.value;
    if (text) {
      addNote(
        { point_id: selectedPoint.id, note: text },
        {
          onSuccess: (res) => console.log(res),
          onError: (err) => console.log(err),
        },
      );
      handleCloseModal();
    }
  };

  const handleDeletePoint = () => {
    deletePoint(
      { point_id: selectedPoint.id },
      {
        onSuccess: (res) => console.log(res),
        onError: (err) => console.log(err),
      },
    );
    handleCloseModal();
  };

  const handleDeleteNote = () => {
    deleteNote(
      { point_id: selectedPoint.id },
      {
        onSuccess: (res) => console.log(res),
        onError: (err) => console.log(err),
      },
    );
    handleCloseModal();
  };

  // const getPointNote = () => {
  //   if (props.pointRef.current.point.note !== undefined) {
  //     return props.pointRef.current.point.note;
  //   }
  //   return "";
  // };

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
            // defaultValue={getPointNote}
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
