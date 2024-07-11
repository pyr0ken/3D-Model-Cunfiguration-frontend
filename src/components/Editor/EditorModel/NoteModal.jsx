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
        point_id: selectedPoint.id,
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
      className="rtl font-vazirmatn text-white dark"
    >
      <ModalContent>
        <ModalHeader className="flex justify-center">
          افزدون یا ویرایش یادداشت
        </ModalHeader>
        <ModalBody>
          <Textarea
            ref={noteRef}
            autoFocus
            label="یادداشت: "
            defaultValue={getPointNote}
            placeholder="یادداشت خود را وارد کنید..."
            variant="flat"
          />
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <div className="flex gap-x-1">
            <Button color="danger" onClick={handleDeletePoint}>
              حذف نقطه
            </Button>
            <Button color="danger" onClick={handleDeleteNote}>
              حذف یادداشت
            </Button>
          </div>
          <Button color="primary" onClick={handleAddNote}>
            ذخیره یادداشت
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
