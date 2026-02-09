"use client";

import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function PostError({ error, reset }: ErrorProps) {
  const router = useRouter();
  const postIdMatch = error.message.match(/POST_NOT_FOUND:(\d+)/);
  const postId = postIdMatch ? postIdMatch[1] : "unknown";

  return (
    <div className="p-4 max-w-3xl mx-auto text-center mt-20">
      <h1 className="text-3xl font-extrabold mb-6 text-red-500">
        Post with ID {postId} not found
      </h1>
      <p className="text-gray-600 mb-4">The post you are looking for does not exist.</p>
      <button
        onClick={() => { router.push("/posts"); }}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Posts
      </button>
    </div>
  );
}
