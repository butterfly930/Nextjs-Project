import { useState } from "react";
import Pagination from "./components/Pagination";
import PostCard from "./components/PostCard";
import SearchBar from "./components/SearchBar";

const posts = [
  { id: 1, title: "First Post" },
  { id: 2, title: "Second Post" },
  { id: 3, title: "Third Post" },
  { id: 4, title: "Fourth Post" },
  { id: 5, title: "Fifth Post" },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );
  const totalItems = filteredPosts.length;
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="max-w-xl mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <SearchBar value={search} onChange={setSearch} />
      <div className="mt-4 grid gap-4">
        {paginatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
