import React, { FC, useEffect, useState } from "react";
import { Modal, Input, DatePicker, Button } from "antd";
import moment from "moment";

interface CardModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSaveCard: (content: string, dueDate: moment.Moment | null) => void;
  cardToEdit?: { content: string; dueDate: string | null };
}

const CardModal: FC<CardModalProps> = ({
  isVisible,
  onClose,
  onSaveCard,
  cardToEdit,
}) => {
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState<moment.Moment | null>(null);

  useEffect(() => {
    if (cardToEdit) {
      setContent(cardToEdit.content);
      setDueDate(cardToEdit.dueDate ? moment(cardToEdit.dueDate) : null);
    } else {
      setContent("");
      setDueDate(null);
    }
  }, [cardToEdit]);

  const handleSave = () => {
    if (content) {
      onSaveCard(content, dueDate);
      setContent("");
      setDueDate(null);
      onClose();
    } else {
      alert("Card content cannot be empty.");
    }
  };

  return (
    <Modal
      title={cardToEdit ? "Edit Card" : "Add New Card"}
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Card content"
      />
      <DatePicker
        value={dueDate}
        onChange={(date) => setDueDate(date)}
        className="mt-4"
        placeholder="Select due date"
      />
    </Modal>
  );
};

export default CardModal;
