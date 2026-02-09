import { PostCard } from "./postcard";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface PostGridProps {
  posts: Post[];
  images: string[];
}

export function PostGrid({ posts, images }: PostGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          imageUrl={images[(post.id - 1) % images.length]}
        />
      ))}
    </div>
  );
}
