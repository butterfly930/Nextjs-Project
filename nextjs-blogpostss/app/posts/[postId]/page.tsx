import Image from "next/image";
import { notFound } from "next/navigation";
import { Author } from "@/common/author";
import { POST_IMAGES } from "@/config/postimages";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts"
  );
  const posts: Post[] = await res.json();

  return posts.map((post) => ({
    postId: post.id.toString(),
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,

  );

  if (!response.ok) {
    notFound();
  }

  const post: Post = await response.json();

  const postImage = POST_IMAGES[(post.id - 1) % POST_IMAGES.length];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-16 mt-10">
        Post {post.id}
      </h1>

      <div className="bg-white rounded-[8%] shadow-2xl p-10">
        <Image
          src={postImage}
          alt={`Post ${post.id} image`}
          width={800}
          height={450}
          className="w-full h-auto rounded-lg mb-4"
          priority={post.id <= 4}
        />

        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          Title: {post.title}
        </h2>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Body: {post.body}
        </p>

        <Author userId={post.userId} />
      </div>
    </div>
  );
}
