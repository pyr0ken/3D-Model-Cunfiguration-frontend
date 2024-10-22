import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
} from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { useRef, useState } from "react";
import useAddNote from "../../../hooks/model/useAddNote";
import useDeleteNote from "../../../hooks/model/useDeleteNote";
import useDeletePoint from "../../../hooks/model/useDeletePoint";
import useEditorStore from "../../../store/editorStore";
import { showAlert } from "../../Core/utils";
import useAiNoteDetail from "../../../hooks/model/useAiNoteDetail";
import useDeleteNoteTitle from "../../../hooks/model/useDeleteNoteTitle";

export default function NoteModal({
  selectedPoint,
  isNoteModalOpen,
  setIsNoteModalOpen,
  refetch,
}) {
  const { mutate: addNote } = useAddNote();
  const { mutate: deletePoint } = useDeletePoint();
  const { mutate: deleteNote } = useDeleteNote();
  const { mutate: deleteNoteTitle } = useDeleteNoteTitle();
  const { mutate: aiNoteDetail } = useAiNoteDetail();

  const { selectedModel } = useEditorStore();

  const [isLoading, setIsLoading] = useState(false);

  const titleRef = useRef(null);
  const noteRef = useRef(null);

  const handleAiNoteDetail = () => {
    const title = titleRef.current.value;
    if (title) {
      setIsLoading(true);
      aiNoteDetail(
        { title },
        {
          onSuccess: (data) => {
            console.log(data.generated_note);
            noteRef.current.value = data.generated_note || "";
            setIsLoading(false);
            showAlert("success", data.detail);
          },
          onError: (err) => console.log(err),
        },
      );
    } else {
      showAlert("info", "لطفا عنوان یادداشت را وارد کنید.");
    }
  };

  const handleAddNote = (event) => {
    const text = noteRef.current.value;
    const title = titleRef.current.value;

    if (text && title) {
      addNote(
        {
          edit_model_id: selectedModel.id,
          point_id: selectedPoint.id,
          note: text,
          title: title,
        },
        {
          onSuccess: (data) => {
            refetch();
            showAlert("success", data.detail);
          },
          onError: (err) => console.log(err),
        },
      );
      handleCloseModal();
    } else {
      showAlert("info", "لطفا عنوان و یادداشت را وارد کنید.");
    }
  };

  const handleDeletePoint = () => {
    deletePoint(
      {
        edit_model_id: selectedModel.id,
        point_id: selectedPoint.id,
      },
      {
        onSuccess: (data) => {
          refetch();
          showAlert("info", data.detail);
        },
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
        onSuccess: (data) => {
          refetch();
          showAlert("info", data.detail);
        },
        onError: (err) => console.log(err),
      },
    );
    handleCloseModal();
  };

  const handleDeleteNoteTitle = () => {
    deleteNoteTitle(
      {
        edit_model_id: selectedModel.id,
        point_id: selectedPoint.id,
      },
      {
        onSuccess: (data) => {
          refetch();
          showAlert("info", data.detail);
        },
        onError: (err) => console.log(err),
      },
    );
    handleCloseModal();
  };

  const getPointNote = () => {
    if (selectedPoint && selectedPoint.note) {
      return selectedPoint.note;
    }
    return "";
  };

  const getPointTitle = () => {
    if (selectedPoint && selectedPoint.title) {
      return selectedPoint.title;
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
      size="xl"
      placement="top-center"
      className="rtl h-96 font-vazirmatn text-white dark"
    >
      <ModalContent>
        <ModalHeader className="flex justify-center">
          افزدون یا ویرایش یادداشت
        </ModalHeader>
        <ModalBody>
          <div className="flex gap-x-3">
            <Input
              ref={titleRef}
              defaultValue={getPointTitle()}
              autoFocus
              placeholder="عنوان یادداشت ..."
            />
            <Button
              onClick={handleAiNoteDetail}
              className="px-5"
              color="secondary"
              variant="shadow"
            >
              {isLoading ? (
                <Spinner color="white" />
              ) : (
                <span>ساختن نوت با ai 🔮</span>
              )}
            </Button>
          </div>
          <textarea
            className="mt-3 h-44 resize-none rounded-xl p-2 outline-none hover:bg-black/40"
            ref={noteRef}
            label="یادداشت: "
            defaultValue={getPointNote()}
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
            <Button color="danger" onClick={handleDeleteNoteTitle}>
              حذف عنوان
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
