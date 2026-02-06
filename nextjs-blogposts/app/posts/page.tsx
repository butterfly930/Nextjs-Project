import Link from "next/link";

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache", // ensures SSG
  });
  return res.json();
}

export default async function Posts() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate loading delays
  const posts = await getPosts();

  return (
    <div className="flex items-center justify-center bg-zinc-50 text-black font-sans pl-50 pr-50 pt-10 pb-10">
      <div className="p-8 text-black">
        {posts.slice(0, 10).map(
          (
            post: any, // limit to 10 for performance
          ) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block flex grid items-center space-x-4 mb-4 p-4 rounded-lg bg-white shadow-lg hover:bg-gray-100 transition"
            >
              <div className="font-bold shadow-xl rounded-full w-10 h-10 mb-6 flex items-center justify-center">
                {post.id}
              </div>
              <div className="mb-5 text-lg">Title: {post.title}</div>
              <div className="text-sm text-gray-600">
                <span className="text-lg italic">Body:</span> {post.body}
              </div>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
