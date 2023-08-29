import http from "k6/http";

// Making sure the basic login works under minimal load
export const options = {
  vus: 1,
  duration: "1s",
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const url = "https://shopieapi.azurewebsites.net/api/v1/users/login";
  const payload = JSON.stringify({
    email: "bezylmophatotieno@gmail.com",
    password: "12345",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      "application-type": "application/json",
    },
  };

  http.post(url, payload, params);
  sleep(1);
}
