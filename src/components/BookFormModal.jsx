import { useForm } from "react-hook-form";
import { useAddBook, useUpdateBook } from "../hooks/useBooks";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function BookFormModal({ book, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues: book || {} });

  const addMutation = useAddBook();
  const updateMutation = useUpdateBook();
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Fantasy",
    "Science",
    "Biography",
    "Mystery",
    "Romance",
  ];

  useEffect(() => {
    if (book?.images) setPreviewUrls(book.images);
    else setPreviewUrls([]);
  }, [book]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const validFiles = selectedFiles.filter((file) => {
      const isValidType = ["image/jpeg", "image/jpg", "image/png", "image/pjpeg"].includes(file.type);
      const isValidSize = file.size <= 20 * 1024 * 1024;

      if (!isValidType) toast.error(`Invalid type: ${file.type}`);
      if (!isValidSize) toast.error(`File too large: ${file.name}`);

      return isValidType && isValidSize;
    });

    if (validFiles.length === 0 && selectedFiles.length > 0) {
      setError("images", { type: "manual", message: "Invalid image(s) selected" });
    } else {
      clearErrors("images");
    }

    setFiles(validFiles);
    setPreviewUrls(validFiles.map((file) => URL.createObjectURL(file)));
  };

  const onSubmit = (data) => {
    if (files.length === 0 && !book) {
      setError("images", { type: "manual", message: "At least one image is required" });
      toast.error("Please upload at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("genre", data.genre);
    formData.append("year", data.year);
    formData.append("status", data.status);
    files.forEach((file) => formData.append("images", file));

    const closeModal = () => {
      reset();
      setFiles([]);
      setPreviewUrls([]);
      onClose();
    };

    if (book) {
      updateMutation.mutate(
        { id: book._id, payload: formData },
        {
          onSuccess: () => {
            toast.success("Book updated successfully!");
            closeModal();
          },
          onError: () => toast.error("Failed to update book."),
        }
      );
    } else {
      addMutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Book added successfully!");
          closeModal();
        },
        onError: () => toast.error("Failed to add book."),
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {book ? "✏️ Edit Book" : "📖 Add New Book"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800"
            >
              ✖
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Title"
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

            <input
              {...register("author", { required: "Author is required" })}
              placeholder="Author"
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400"
            />
            {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}

            <select
              {...register("genre", { required: "Genre is required" })}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
            >
              <option value="">Select Genre</option>
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}

            <input
              type="number"
              {...register("year", { required: "Year is required", min: { value: 0, message: "Invalid year" } })}
              placeholder="Year"
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400"
            />
            {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}

            <select
              {...register("status")}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
            >
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>

            {/* Images Upload */}
            <div>
              <label className="block text-gray-300 mb-1">Images</label>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileChange}
                className="w-full text-gray-300"
              />
              {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
              <div className="flex gap-2 mt-2 flex-wrap">
                {previewUrls.map((src, i) => (
                  <img
                    key={i}
                    src={src.startsWith("http") || src.startsWith("blob:") ? src : `${API_URL}${src}`}
                    alt={`preview-${i}`}
                    className="h-16 w-16 object-cover rounded border border-gray-600"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-white text-black rounded-lg"
            >
              {book ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
