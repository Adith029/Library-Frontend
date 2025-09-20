export default function BookCard({ book, onEdit, onDelete }) {
const API_URL = import.meta.env.VITE_API_URL;
    console.log(`${API_URL}${book.images[0]}`);
    
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl shadow hover:shadow-xl p-6 flex flex-col">
      {book.images && book.images.length > 0 && (
  <div className="w-full h-60 mb-4 flex items-center justify-center bg-gray-800 rounded">
    <img 
      src={`${API_URL}${book.images[0]}`} 
      alt={book.title} 
      className="w-full h-full object-contain rounded"
    />
  </div>
)}

      <h2 className="text-lg font-bold text-white mb-2">{book.title}</h2>
      <p className="text-gray-300">Author: {book.author}</p>
      <p className="text-gray-300">Genre: {book.genre}</p>
      <p className="text-gray-300">Year: {book.year}</p>
      <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${book.status === "Available" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
        {book.status}
      </span>

      <div className="flex gap-2 mt-4">
        <button onClick={() => onEdit(book)} className="flex-1 px-3 py-2 bg-gray-800 text-white rounded">Edit</button>
        <button onClick={() => onDelete(book._id)} className="flex-1 px-3 py-2 bg-red-900 text-red-300 rounded">Delete</button>
      </div>
    </div>
  );
}
