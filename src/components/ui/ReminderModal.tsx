import React, { useState, useEffect } from "react";
import { Modal, Input, Button } from "antd";
import moment, { Moment } from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface Reminder {
  text: string;
  time: any; // Reminder set time
  completedAt?: string; // Optional completion time
}

interface ReminderModalProps {
  visible: boolean;
  selectedDate: Moment;
  existingReminders: Reminder[];
  onClose: () => void;
  onSave: (reminders: Reminder[]) => void;
  audio: HTMLAudioElement;
}

const ReminderModal: React.FC<ReminderModalProps> = ({
  visible,
  selectedDate,
  existingReminders,
  onClose,
  onSave,
  audio,
}) => {
  const [reminderText, setReminderText] = useState("");
  const [reminderTime, setReminderTime] = useState<Moment | null>(null);
  const [remindersList, setRemindersList] = useState<Reminder[]>([]);

  useEffect(() => {
    if (visible) {
      setRemindersList(existingReminders);
    }
  }, [visible, existingReminders]);

  const handleAddReminder = () => {
    if (reminderText.trim() !== "" && reminderTime) {
      const newReminder: Reminder = {
        text: reminderText,
        time: reminderTime.valueOf(), // Store as Unix timestamp
      };
      setRemindersList([...remindersList, newReminder]); // Add to the list
      setReminderText(""); // Reset fields
      setReminderTime(null);
    }
  };

  const handleDeleteReminder = (index: number) => {
    setRemindersList((prevReminders) =>
      prevReminders.filter((_, i) => i !== index)
    );
  };

  const handleSave = () => {
    onSave(remindersList);
    onClose(); // Close the modal
  };

  return (
    <Modal
      title={`Reminders for ${selectedDate.format("YYYY-MM-DD")}`}
      visible={visible}
      onOk={handleSave}
      onCancel={onClose}
    >
      <div>
        <Input
          placeholder="Enter a reminder"
          value={reminderText}
          onChange={(e) => setReminderText(e.target.value)}
          onPressEnter={handleAddReminder} // Allow "Enter" key to add reminder
        />
        <Input
          type="time"
          onChange={(e) => setReminderTime(moment(e.target.value, "HH:mm"))} // Parse time input
          className="mt-2"
        />
        <Button className="mt-2" type="primary" onClick={handleAddReminder}>
          Add Reminder
        </Button>

        <ul className="mt-4">
          {remindersList.map((reminder, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>
                {reminder.text} - {moment(reminder.time).format("HH:mm")}
              </span>
              <Button type="link" onClick={() => handleDeleteReminder(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default ReminderModal;
