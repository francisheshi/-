import React, { useState, useCallback, useEffect, FC } from "react";
import { Calendar, notification } from "antd";
import ReminderModal from "../../components/ui/ReminderModal";
import moment, { Moment } from "moment";
import { SearchContextProps } from "../../context/SearchContext";

interface Reminder {
  text: string;
  time: number;
  played?: boolean;
}

interface RemindersMap {
  [key: string]: Reminder[];
}

const Title4 = ({ query }: { query: string }) => {
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [existingReminders, setExistingReminders] = useState<RemindersMap>({});
  const [reminderDates, setReminderDates] = useState<Set<string>>(new Set());
  const [audio] = useState(new Audio("/ringtone.mp3"));

  // Handle date click
  const onDateClick = (date: any) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().valueOf();
      Object.keys(existingReminders).forEach((date) => {
        existingReminders[date].forEach((reminder) => {
          if (reminder.time <= now) {
            audio.play();
            notification.open({
              message: "Reminder",
              description: reminder.text,
              duration: 5,
            });
            setExistingReminders((prev) => {
              if (!prev[date]) return prev;
              return {
                ...prev,
                [date]: prev[date].filter((r) => r.time > now),
              };
            });
          }
        });
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [existingReminders, audio]);

  const handleSaveReminders = useCallback(
    (reminders: Reminder[]) => {
      if (selectedDate) {
        const formattedDate = selectedDate.format("YYYY-MM-DD");
        setExistingReminders((prev) => ({
          ...prev,
          [formattedDate]: reminders,
        }));
        setReminderDates((dates) => new Set(dates.add(formattedDate)));
      }
    },
    [selectedDate]
  );

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const dateCellRender = (value: any) => {
    const formattedDate = value.format("YYYY-MM-DD");

    if (reminderDates.has(formattedDate)) {
      const remindersForDate = existingReminders[formattedDate] || [];

      if (remindersForDate.length > 0) {
        const sortedReminders = remindersForDate
          .filter((reminder) => moment(reminder.time).isValid())
          .sort((a, b) => moment(a.time).diff(moment(b.time)));

        return (
          <div className="bg-yellow-300 p-2">
            <ul className="list-disc ml-4">
              {sortedReminders.map((reminder, index) => (
                <li
                  key={index}
                  className={
                    moment(reminder.time).isSameOrBefore(moment())
                      ? "font-bold"
                      : ""
                  }
                >
                  {reminder.text} - {moment(reminder.time).format("hh:mm A")}
                </li>
              ))}
            </ul>
          </div>
        );
      }
    }

    return null;
  };

  return (
    <div className="flex-1 justify-center p-8 text-lg">
      <h1 className="text-4xl font-bold mb-5">Calendar</h1>
      <Calendar onSelect={onDateClick} dateCellRender={dateCellRender} />
      {selectedDate && (
        <ReminderModal
          visible={isModalVisible}
          selectedDate={selectedDate}
          existingReminders={
            existingReminders[selectedDate.format("YYYY-MM-DD")] || []
          }
          onClose={handleCloseModal}
          onSave={handleSaveReminders}
          audio={audio}
        />
      )}
    </div>
  );
};

export default Title4;
