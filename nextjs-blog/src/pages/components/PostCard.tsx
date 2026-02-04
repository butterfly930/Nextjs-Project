import Link from "next/link";

type Post = {
  id: number;
  title: string;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.id}`} className="p-4 border rounded hover:shadow">
      <h2 className="font-bold text-xl">{post.title}</h2>
    </Link>
  );
}
