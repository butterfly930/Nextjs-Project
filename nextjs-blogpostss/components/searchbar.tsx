"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  initialQuery?: string;
  basePath: string;
}

export function SearchBar({ initialQuery = "", basePath }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(`${basePath}?search=${encodeURIComponent(query)}`);
    }, 100);

    return () => clearTimeout(timeout);
  }, [query, router, basePath]);

  //for button search
  const handleSubmit = (e: React.FormEvent) => {
    router.push(`${basePath}?search=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 flex w-full max-w-md gap-2 mx-auto justify-center"
    >
      <input
        type="text"
        placeholder="Search posts by title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
