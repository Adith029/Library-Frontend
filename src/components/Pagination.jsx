export default function Pagination({ total, page, setPage }) {
  const totalPages = Math.ceil(total / 10);
  return (
    <div className="flex justify-center gap-2 mt-6">
      {[...Array(totalPages)].map((_, idx) => (
        <button key={idx} onClick={() => setPage(idx + 1)}
          className={`px-3 py-1 rounded ${page === idx + 1 ? "bg-white text-black" : "bg-gray-800 text-white"}`}>
          {idx + 1}
        </button>
      ))}
    </div>
  );
}
