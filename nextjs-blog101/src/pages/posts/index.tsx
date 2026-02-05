import Link from "next/link";
import { Fragment } from "react/jsx-runtime";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Pagination from "../../components/pagination/pagination";
import { useState } from "react";

type Post = {
  id: number;
  title: string;
  [key: string]: any;
};

type PostListProps = {
  posts: Post[];
};

function PostList({ posts }: PostListProps) {
      const [page, setPage] = useState(1);
  const postsPerPage = 10;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginatedPosts = posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <Fragment>
      <div className="min-h-screen bg-white ">
        <main>
          <h1 className="text-4xl font-bold mb-4 text-center text-gray-900 mt-20">
            List of Posts
          </h1>
          <div className="flex flex-col items-center">
            {paginatedPosts.map((post) => (
              <div
                key={post.id}
                className="w-full max-w-xl border-2 border-blue-600 rounded-lg p-4 mb-4 flex flex-col items-center transition-shadow duration-200 hover:shadow-lg hover:border-blue-800"
              >
                <Link href={`/posts/${post.id}`} passHref>
                  <div className="flex flex-col items-center w-full">
                    <span className="text-xl font-semibold text-gray-700 mb-2">
                      {post.id}
                    </span>
                    <h2 className="text-xl text-black hover:text-blue-600 cursor-pointer text-center">
                      {post.title}
                    </h2>
                  </div>
                </Link>
                <hr className="w-full mt-2" />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </main>
      </div>
    </Fragment>
  );
}
export default PostList;

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  return {
    props: {
      posts: data,
    },
  };
}
