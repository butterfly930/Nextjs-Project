export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      {/* Classy Spinner */}
      <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-700 text-lg font-medium">Loading...</p>
    </div>
  );
}
