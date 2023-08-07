import axios from "axios";

const clientApiService_GET = axios.create({
  baseURL: "",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getBoards() {
    return clientApiService_GET(
      "https://nlcmarquesdev.github.io/data_json_trello.github.io/boards.json"
    );
  },
  getBoard(board) {
    return clientApiService_GET(
      "https://nlcmarquesdev.github.io/data_json_trello.github.io/" +
        board +
        ".json"
    );
  },
};
