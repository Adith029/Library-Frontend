import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBooks, addBook, updateBook, deleteBook } from "../api/bookApi";

export const useBooks = ({ page, search, genre, status }) => {
  return useQuery({
    queryKey: ["books", { page, search, genre, status }],
    queryFn: () => fetchBooks({ page, search, genre, status }),
    keepPreviousData: true,
  });
};


export const useAddBook = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addBook,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['books'] }),
  });
};

export const useUpdateBook = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateBook(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['books'] }),
  });
};

export const useDeleteBook = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['books'] }),
  });
};
