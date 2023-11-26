// const API_BASE_URL = "https://api-auth.tenslam.ai/api/v1";
const API_BASE_URL = "http://localhost:8080/api/v1";

export const POST = (url, data) =>
  fetch(`${API_BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
    cache: "default",
  }).then((res) => res.json());
