import React, { useState, useEffect } from "react";
import { Button } from "antd";
import ReminderModal from "./ReminderModal";
import moment, { Moment } from "moment";

interface Reminder {
  text: string;
  time: number;
  completedAt?: string;
}

interface ReminderAppProps {
  selectedDate: Moment | any;
}

// ReminderApp.tsx
const ReminderApp: React.FC<ReminderAppProps> = ({ selectedDate }) => {
  const [existingReminders, setExistingReminders] = useState<Reminder[]>([]);
  const [reminderModalVisible, setReminderModalVisible] = useState(false);
  const [audio] = useState(new Audio("ringtone.mp3"));

  const openReminderModal = () => {
    setReminderModalVisible(true);
  };

  const handleSaveReminders = (reminders: Reminder[]) => {
    // Correctly update the reminders with the new reminders from the modal
    setExistingReminders((prevReminders) => [
      ...prevReminders, // Spread existing reminders
      ...reminders, // Add new reminders from the modal
    ]);
    setReminderModalVisible(false); // Close the modal after saving
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().valueOf(); // Get current time
      existingReminders.forEach((reminder) => {
        if (reminder.time <= now) {
          audio.play(); // Play the sound
          setExistingReminders((prev) => prev.filter((r) => r.time > now));
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up
  }, [existingReminders, audio]);

  return (
    <div>
      <Button onClick={openReminderModal}>Add Reminders</Button>

      <ReminderModal
        visible={reminderModalVisible}
        selectedDate={selectedDate}
        existingReminders={existingReminders}
        onSave={handleSaveReminders} // Pass the save function
        onClose={() => setReminderModalVisible(false)} // Close the modal
        audio={audio}
      />
    </div>
  );
};

export default ReminderApp;
