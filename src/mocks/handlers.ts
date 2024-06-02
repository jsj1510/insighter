import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("https://api.example.com/api/user", () => {
    return HttpResponse.json({
      data: {
        name: "hi",
        age: 25,
      },
    });
  }),
];
