import React, { useState } from "react";
import { Calendar } from "antd";
import type { Moment } from "moment";
import ReminderModal from "../../components/ui/ReminderModal"; // Import the updated child component

const Title4 = () => {
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null); // State to store the selected date
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [reminders, setReminders] = useState<{ [key: string]: string[] }>({}); // State to store reminders by date

  // Handle the date selection
  const onDateSelect = (date: any) => {
    setSelectedDate(date); // Store selected date
    setIsModalVisible(true); // Show the modal when date is clicked
  };

  // Handle saving multiple reminders for the selected date
  const handleSaveReminders = (newReminders: string[]) => {
    if (!selectedDate) return; // Exit if no date is selected
    const formattedDate = selectedDate.format("YYYY-MM-DD");

    // Save all reminders for the selected date
    setReminders((prevReminders) => ({
      ...prevReminders,
      [formattedDate]: newReminders, // Replace previous reminders with new ones
    }));
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Get existing reminders for the selected date
  const getExistingReminders = () => {
    if (!selectedDate) return [];
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    return reminders[formattedDate] || [];
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-700">My Calendar</h1>
      </div>

      {/* Calendar */}
      <div className="bg-white shadow rounded-lg p-4">
        <Calendar
          fullscreen={false}
          onSelect={onDateSelect} // Trigger modal on date select
          className="custom-calendar"
        />
      </div>

      {/* Modal for adding reminders */}
      <ReminderModal
        visible={isModalVisible}
        selectedDate={selectedDate}
        existingReminders={getExistingReminders()} // Pass existing reminders to modal
        onClose={handleCloseModal}
        onSave={handleSaveReminders} // Handle saving multiple reminders
      />
    </div>
  );
};

export default Title4;
