import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const fetchBooks = async ({
  page = 1,
  search = "",
  genre = "",
  status = "",
}) => {
  const { data } = await axios.get(`${API_URL}/api/`, {
    params: { page, limit: 10, search, genre, status },
  });
  return data.data;
};

export const addBook = async (payload) => {
  const { data } = await axios.post(`${API_URL}/api`, payload);
  return data, data;
};

export const updateBook = async (id, payload) => {
  const { data } = await axios.put(`${API_URL}/api/${id}`, payload);
  return data.data;
};

export const deleteBook = async (id) => {
  const { data } = await axios.delete(`${API_URL}/api/${id}`);
  return data.data;
};
