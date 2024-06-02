import axios from "axios";

export const fetchEvents = async (page: number) => {
  const response = await axios.get("/events", {
    params: {
      _page: page,
    },
  });

  return response.data;
};
