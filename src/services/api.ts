import axios from 'axios';

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "af3279e78076bc5268a9739421acebff",
    language: "pt-BR",
    include_adult: false,
  },
});
