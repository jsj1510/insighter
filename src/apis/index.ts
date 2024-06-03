import axios from "axios";

interface EventData {
  name: string;
  date: Date;
  hour: string;
  location: string;
  explanation: string;
}

export const fetchEvents = async (page: number, order: string) => {
  const response = await axios.get("/events", {
    params: {
      _page: page,
      _sort: order == "ASC" ? "-date" : "date",
    },
  });
  return response.data;
};

export const eventsDetail = async (id: string) => {
  const response = await axios.get(`/events?id=${id}`);
  return response.data;
};

export const putEvent = async (id: string, newData: EventData) => {
  const response = await axios.put(`/events/${id}`, newData);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await axios.delete(`/events/${id}`);
  return response.data;
};
