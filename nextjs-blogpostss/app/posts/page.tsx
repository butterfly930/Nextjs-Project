import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/searchbar";
import { PostGrid } from "@/components/postgrid";
import { POST_IMAGES } from "../../config/postimages";
import { fetchPosts, Post } from "../lib/fetchposts";

const POSTS_PER_PAGE = 10;

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page, search } = await searchParams;
  const currentPage = Number(page) || 1;

  let posts: Post[] = [];

  try {
    posts = await fetchPosts(search);
  } catch (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-medium">
          Failed to load posts. Please try again later.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const filteredPosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 mt-10">Blog Posts</h1>

      {/* Search bar */}
      <SearchBar initialQuery={search || ""} basePath="/posts" />

      {search && posts.length === 0 ? (
        <div className="text-center text-red-600 text-xl font-bold mt-50 my-10">
          Please try again, the post you searched for was not found.
        </div>
      ) : (
        <>
          <PostGrid posts={filteredPosts} images={POST_IMAGES} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/posts"
          />
        </>
      )}
    </div>
  );
}
