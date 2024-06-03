import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Form from "@/containers/Post/Form/Form";
import { eventsDetail, putEvent } from "@/apis";

interface EventData {
  name: string;
  date: Date;
  hour: string;
  location: string;
  explanation: string;
}

const PostPage = () => {
  const router = useRouter();

  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  const { data, isLoading } = useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      if (!id) return null;
      return eventsDetail(id);
    },
  });

  const handleSubmit = async (eventData: EventData) => {
    if (id) {
      putEvent(id, eventData);
    } else {
      await axios.post("/events", eventData);
    }

    router.replace("/");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Form onSubmit={handleSubmit} initialEvent={data?.[0]} />
    </div>
  );
};

export default PostPage;
