import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

interface EventData {
  name: string;
  date: Date;
  time: string;
  location: string;
  explanation: string;
}

interface EventFormProps {
  onSubmit: (eventData: EventData) => void;
  initialEvent?: EventData;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialEvent }) => {
  const [event, setEvent] = useState<EventData>({
    name: initialEvent?.name || "",
    date: initialEvent?.date || new Date(),
    time: initialEvent?.time || "00:00",
    location: initialEvent?.location || "",
    explanation: initialEvent?.explanation || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(event);
  };

  const handleChange = (key: keyof EventData, value: string | Date | null) => {
    if (value !== null) {
      setEvent((prevEvent: any) => {
        if (key === "date" && value instanceof Date) {
          return {
            ...prevEvent,
            [key]: value.toISOString().split("T")[0], // 날짜를 "YYYY-MM-DD" 형식으로 저장
          };
        } else if (key === "time" && typeof value === "string") {
          return {
            ...prevEvent,
            [key]: value,
          };
        } else if (typeof value === "string") {
          return {
            ...prevEvent,
            [key]: value,
          };
        }
        return prevEvent;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          margin: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <label>이벤트명:</label>
        <input
          type="text"
          value={event.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div
        style={{
          margin: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <label>날짜:</label>
        <DatePicker
          selected={event.date}
          onChange={(date) => handleChange("date", date)}
        />
      </div>
      <div
        style={{
          margin: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <label>시간:</label>
        <TimePicker
          value={event.time}
          onChange={(time) => handleChange("time", time)}
        />
      </div>
      <div
        style={{
          margin: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <label>장소:</label>
        <input
          type="text"
          value={event.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>
      <div
        style={{
          margin: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <label>설명:</label>
        <textarea
          value={event.explanation}
          onChange={(e) => handleChange("explanation", e.target.value)}
        />
      </div>
      <button type="submit">등록</button>
    </form>
  );
};

export default EventForm;
