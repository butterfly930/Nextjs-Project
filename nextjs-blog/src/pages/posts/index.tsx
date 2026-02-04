import { GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";
import PostCard from "@/pages/components/PostCard";
import Pagination from "@/pages/components/Pagination";
import SearchBar from "@/pages/components/SearchBar";

type Post = {
  id: number;
  title: string;
  body: string;
};

interface Props {
  posts: Post[];
}

const POSTS_PER_PAGE = 10;

export default function Posts({ posts }: Props) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>

      <SearchBar value={search} onChange={setSearch} />

      <div className="grid gap-4 mt-4">
        {paginatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination
        totalItems={filteredPosts.length}
        itemsPerPage={POSTS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts: Post[] = await res.json();

    return {
      props: { posts },
    };
  } catch (error) {
    return {
      props: { posts: [] },
    };
  }
};
