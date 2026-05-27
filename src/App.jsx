import { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { api } from './services/api';

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await api.getBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(`Failed to connect to backend: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddOrUpdate = async (bookData) => {
    try {
      if (editingBook) {
        const updated = await api.updateBook(editingBook.id, bookData);
        setBooks(books.map((b) => (b.id === editingBook.id ? updated : b)));
      } else {
        const newBook = await api.addBook(bookData);
        setBooks([...books, newBook]);
      }
      closeForm();
    } catch (err) {
      console.error("Form action failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this book permanently?')) {
      try {
        await api.deleteBook(id);
        setBooks(books.filter((b) => b.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openEditForm = (book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingBook(null);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">📚 Book Management System</h1>
          <button onClick={() => setIsFormOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow">
            + Add New Book
          </button>
        </header>

        {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 border border-red-200">{error}</div>}

        <BookList books={books} loading={loading} onEdit={openEditForm} onDelete={handleDelete} />

        {isFormOpen && <BookForm onSubmit={handleAddOrUpdate} initialData={editingBook} onClose={closeForm} />}
      </div>
    </div>
  );
}