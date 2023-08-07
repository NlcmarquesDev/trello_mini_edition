import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getPhotos(query, page) {
    return apiClient.get(
      `/search/photos?query=${query}&page=${page}&order_by=popular&orientation=landscape&client_id=Qx8DFb3GPHXKa3VOZOuZ8U1eWWk-bLl5pCyZ9_IzIoY`
    );
  },
};
