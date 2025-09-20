import { createContext, useState } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("");

  return (
    <BookContext.Provider value={{
      modalOpen, setModalOpen,
      editingBook, setEditingBook,
      search, setSearch,
      page, setPage,
      genre, setGenre,
      status, setStatus
    }}>
      {children}
    </BookContext.Provider>
  );
};
