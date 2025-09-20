import { useContext } from "react";
import { BookContext } from "../contexts/BookContext";
import logo from '../assets/images/unnamed.png'

export default function Header() {
  const {
    search,
    setSearch,
    setModalOpen,
    setEditingBook,
    genre,
    setGenre,
    status,
    setStatus,
  } = useContext(BookContext);

  return (
    <div className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl"><img src={logo} className='w-12 h-12' alt="" /></div>
          <h1 className="text-3xl font-bold text-white">Library App</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
          />
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="p-3 bg-gray-800 border border-gray-600 rounded text-white"
          >
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Science">Science</option>
            <option value="Biography">Biography</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="History">History</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Thriller">Thriller</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-3 bg-gray-800 border border-gray-600 rounded text-white"
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
          </select>

          <button
            className="px-6 py-3 bg-white text-black font-medium rounded hover:bg-gray-100 transition"
            onClick={() => {
              setModalOpen(true);
              setEditingBook(null);
            }}
          >
            ➕ Add New Book
          </button>
        </div>
      </div>
    </div>
  );
}
