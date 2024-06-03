import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DatePicker from "react-datepicker";

import EventForm from "@/containers/Post/Form/Form";

interface EventData {
  name: string;
  date: Date;
  time: string;
  location: string;
  explanation: string;
}

const PostPage = () => {
  const router = useRouter();

  const handleSubmit = async (eventData: EventData) => {
    const response = await axios.post("/events", eventData);
    console.log(response);
    router.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
};

export default PostPage;
