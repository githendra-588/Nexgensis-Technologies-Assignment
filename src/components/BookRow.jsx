export default function BookRow({ book, onEdit, onDelete }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="p-3 font-medium text-gray-900">{book.title}</td>
      <td className="p-3 text-gray-600">{book.author}</td>
      <td className="p-3">
        <span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-100">
          {book.genre || 'N/A'}
        </span>
      </td>
      <td className="p-3 text-gray-600">{book.year || '—'}</td>
      <td className="p-3 text-right space-x-3">
        <button 
          onClick={() => onEdit(book)} 
          className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(book.id)} 
          className="text-red-600 hover:text-red-800 text-sm font-semibold transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}