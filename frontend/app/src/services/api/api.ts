import axios from "axios";

const url = "http://localhost:8000";

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export function getRequest(URL: string) {
  return api.get(URL).then((response) => response.data);
}

export function postRequest(URL: string) {
  return api.post(`/${URL}`).then((response) => response.data);
}

export function patchRequest(URL: string) {
  return api.patch(`/${URL}`).then((response) => response.data);
}

export function deleteRequest(URL: string) {
  return api.delete(`/${URL}`).then((response) => response.data);
}
