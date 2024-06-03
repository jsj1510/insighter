import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

interface EventData {
  name: string;
  date: Date;
  hour: string;
  location: string;
  explanation: string;
}

interface EventFormProps {
  onSubmit: (eventData: EventData) => void;
  initialEvent?: EventData;
}

const Form: React.FC<EventFormProps> = ({ onSubmit, initialEvent }) => {
  const [event, setEvent] = useState<EventData>({
    name: initialEvent?.name || "",
    date: initialEvent?.date ? new Date(initialEvent.date) : new Date(),
    hour: initialEvent?.hour || "00:00",
    location: initialEvent?.location || "",
    explanation: initialEvent?.explanation || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(event);
  };

  const handleChange = (key: keyof EventData, value: string | Date | null) => {
    if (value !== null) {
      setEvent((prevEvent) => ({ ...prevEvent, [key]: value }));
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
          value={event.hour}
          onChange={(hour) => handleChange("hour", hour)}
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
      <button type="submit">{initialEvent ? "수정" : "등록"}</button>
    </form>
  );
};

export default Form;
