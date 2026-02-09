import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-4 max-w-3xl mx-auto text-center mt-20">
      <h1 className="text-3xl font-extrabold mb-6 text-red-500">
        Post Not Found
      </h1>
      <p className="text-gray-600 mb-4">
        The post you are looking for does not exist.
      </p>
      <Link
        href="/posts"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
      >
        Back to Posts
      </Link>
    </div>
  );
}