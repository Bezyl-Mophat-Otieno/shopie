import http from "k6/http";
import { sleep, check } from "k6";
export let options = {
    vus: 1,
    duration: "30s",
    thresholds: {
        http_req_duration: ["p(95)<500"],
    },
};
export default function () {
    const url = "http://localhost:5000/api/v1/users/login";
    const payload = JSON.stringify({
        email: "admin@gmail.com",
        password: "12345",
    });
    const params = {
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
    };
    const res = http.post(url, payload, params);
    check(res, {
        "is status 200": (r) => r.status === 200,
        "is duration < 500ms": (r) => r.timings.duration < 500,
    });
    sleep(1);
}
