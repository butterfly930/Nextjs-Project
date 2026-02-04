import { GetStaticPaths, GetStaticProps } from "next";

type Post = {
  id: number;
  title: string;
  body: string;
};

interface Props {
  post: Post | null;
}

export default function PostPage({ post }: Props) {
  if (!post) return <p className="text-center mt-10">Post not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 border border-gray-200 rounded shadow-md mt-10 text-center bg-white">
        <h2 className="text-2xl font-semibold mb-4">Post Details</h2>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  const paths = posts.map((post) => ({ params: { id: post.id.toString() } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params?.id}`
    );
    const post: Post = await res.json();

    return { props: { post } };
  } catch {
    return { props: { post: null } };
  }
};
