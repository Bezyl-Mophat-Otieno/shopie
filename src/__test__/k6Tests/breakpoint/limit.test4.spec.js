import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // Key configurations for Limit testing in the process Product Listing
  executor: "ramping-arrival-rate", //Assure load increase if the system slows
  stages: [
    { duration: "2h", target: 20000 }, // just slowly ramp-up to a HUGE load
  ],
};

export default () => {
  const url = "https://shopieapi.azurewebsites.net/api/v1/products/";
  sleep(1);

  http.get(url);
};
