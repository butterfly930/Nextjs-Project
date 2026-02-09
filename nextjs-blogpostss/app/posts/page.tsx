import { Pagination } from "../../ui/components/pagination";
import { SearchBar } from "../../ui/components/searchbar";
import { PostGrid } from "../../ui/components/postgrid";
import { POST_IMAGES } from "../../config/postimages"; // fixed typo

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

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
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      { cache: "force-cache" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    posts = await response.json();
  } catch (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-medium">
          Failed to load posts. Please try again later.
        </p>
      </div>
    );
  }

  // filter by search query
  if (search) {
    posts = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const filteredPosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 mt-10">Blog Posts</h1>

      <SearchBar initialQuery={search || ""} basePath="/posts" />

      <PostGrid posts={filteredPosts} images={POST_IMAGES} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/posts"
      />
    </div>
  );
}
