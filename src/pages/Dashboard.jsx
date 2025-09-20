import { useContext } from "react";
import { BookContext } from "../contexts/BookContext";
import Header from "../components/Header";
import BookGrid from "../components/BookGrid";
import BookFormModal from "../components/BookFormModal";
import Pagination from "../components/Pagination";
import { useBooks } from "../hooks/useBooks";

export default function Dashboard() {
  const { modalOpen, setModalOpen, editingBook, setEditingBook, search, page, setPage, genre, status } = useContext(BookContext);

  const { data, isLoading } = useBooks({ page, search, genre, status });
  const books = data?.data || [];

  const openEditModal = (book) => {
    setEditingBook(book);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white bg-[url('/bg-pattern.jpg')] bg-cover bg-center">
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <BookGrid books={books} onEdit={openEditModal} />
        {data?.total > 10 && <Pagination total={data.total} page={page} setPage={setPage} />}
      </div>
      {modalOpen && <BookFormModal book={editingBook} onClose={() => setModalOpen(false)} />}
    </div>
  );
}
