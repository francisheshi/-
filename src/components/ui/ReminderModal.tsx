import React, { useState, useEffect } from "react";
import { Modal, Input, Button } from "antd";
import type { Moment } from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ReminderModalProps {
  visible: boolean;
  selectedDate: Moment | null;
  existingReminders: string[]; // New prop to receive existing reminders
  onClose: () => void;
  onSave: (reminders: string[]) => void;
}

const ReminderModal: React.FC<ReminderModalProps> = ({
  visible,
  selectedDate,
  existingReminders,
  onClose,
  onSave,
}) => {
  const [reminderText, setReminderText] = useState(""); // Single reminder input
  const [remindersList, setRemindersList] = useState<string[]>([]); // List of reminders

  // Load existing reminders when modal is opened
  useEffect(() => {
    if (visible) {
      setRemindersList(existingReminders);
    }
  }, [visible, existingReminders]);

  // Add reminder to the list
  const handleAddReminder = () => {
    if (reminderText.trim() !== "") {
      setRemindersList((prevReminders) => [...prevReminders, reminderText]);
      setReminderText(""); // Clear input after adding
    }
  };

  // Remove reminder from the list
  const handleDeleteReminder = (index: number) => {
    setRemindersList((prevReminders) =>
      prevReminders.filter((_, i) => i !== index)
    );
  };

  // Save all reminders and close the modal
  const handleSaveReminders = () => {
    onSave(remindersList); // Send all reminders back to parent
    onClose(); // Close the modal
  };

  return (
    <Modal
      title={`Add Reminders for ${selectedDate?.format("YYYY-MM-DD")}`}
      visible={visible}
      onOk={handleSaveReminders}
      onCancel={onClose}
    >
      <div>
        <Input
          placeholder="Enter a reminder"
          value={reminderText}
          onChange={(e) => setReminderText(e.target.value)}
          onPressEnter={handleAddReminder} // Allow pressing Enter to add a reminder
        />
        <Button className="mt-2" type="primary" onClick={handleAddReminder}>
          Add Reminder
        </Button>

        {/* List of reminders */}
        <ul className="mt-4">
          {remindersList.map((reminder, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{reminder}</span>
              <Button type="link" onClick={() => handleDeleteReminder(index)}>
                <FontAwesomeIcon icon="fa-solid fa-trash" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default ReminderModal;
