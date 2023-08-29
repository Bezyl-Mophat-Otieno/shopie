import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // Key configurations for avg load test in Order Checkout
  stages: [
    { duration: "50s", target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: "1m", target: 100 }, // stay at 100 users for 30 minutes
    { duration: "50s", target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.03"],
  },
};

export default () => {
  const url = "https://shopieapi.azurewebsites.net/api/v1/products/";
  sleep(1);

  http.get(url);
};
