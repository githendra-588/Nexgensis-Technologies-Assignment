import { useState } from 'react';
import BookRow from './BookRow';
import Loader from './Loader';

export default function BookList({ books, loading, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = [...new Set(books.map((b) => b.genre).filter(Boolean))];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === '' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  // 👇 Using the new Loader component here
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Search and Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Books Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-3 text-gray-700 font-semibold">Title</th>
              <th className="p-3 text-gray-700 font-semibold">Author</th>
              <th className="p-3 text-gray-700 font-semibold">Genre</th>
              <th className="p-3 text-gray-700 font-semibold">Year</th>
              <th className="p-3 text-gray-700 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                // 👇 Using the new BookRow component here
                <BookRow 
                  key={book.id} 
                  book={book} 
                  onEdit={onEdit} 
                  onDelete={onDelete} 
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">No books found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}