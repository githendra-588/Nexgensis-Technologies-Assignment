import { useState, useEffect } from 'react';

export default function BookForm({ onSubmit, initialData, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        author: initialData.author || '',
        genre: initialData.genre || '',
        year: initialData.year || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim()) {
      alert('Title and Author are strictly required!');
      return;
    }
    onSubmit({
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre.trim(),
      year: formData.year.toString().trim(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {initialData ? '📝 Edit Book' : '📚 Add New Book'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 text-gray-950 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Author *</label>
            <input required type="text" name="author" value={formData.author} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 text-gray-950 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Genre</label>
            <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 text-gray-950 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 text-gray-950 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">Save Book</button>
          </div>
        </form>
      </div>
    </div>
  );
}