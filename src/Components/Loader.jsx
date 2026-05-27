export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      {/* Tailwind Animated Spinner */}
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium animate-pulse">Fetching books from server...</p>
    </div>
  );
}