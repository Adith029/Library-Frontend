import { useState, useMemo } from "react";
import BookCard from "./BookCards";
import { useDeleteBook } from "../hooks/useBooks";
import toast from "react-hot-toast";

export default function BookGrid({ books, onEdit }) {
  const deleteMutation = useDeleteBook();
  const [page, setPage] = useState(1);
  const limit = 10; 

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;

    deleteMutation.mutate(id, {
      onSuccess: () => toast.success("Book deleted successfully!"),
      onError: () => toast.error("Failed to delete book."),
    });
  };

  if (!books || books.length === 0)
    return (
      <div className="text-center py-12 text-gray-400">No books found</div>
    );

  const paginatedBooks = useMemo(() => {
    const start = (page - 1) * limit;
    return books.slice(start, start + limit);
  }, [books, page]);

  const totalPages = Math.ceil(books.length / limit);

  return (
    <>
      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedBooks.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))}
        
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-2 bg-gray-800 text-white rounded">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
