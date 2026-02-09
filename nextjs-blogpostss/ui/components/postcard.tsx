"use client"; // <--- add this at the top

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Author } from "@/ui/components/author";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface PostCardProps {
  post: Post;
  imageUrl: string;
}

export function PostCard({ post, imageUrl }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="bg-white rounded-[8%] shadow-2xl p-6 block hover:shadow-lg transition"
    >
      <h1 className="text-2xl font-bold mb-5">{post.id}</h1>

      <Image
        src={imageUrl}
        alt={`Post ${post.id} image`}
        width={800}
        height={450}
        className="w-full h-auto rounded-lg mb-4"
        priority={post.id <= 4}
      />

      <h2 className="text-2xl font-bold mb-3 text-gray-800">
        Title: {post.title}
      </h2>
      <p className="text-gray-600 mb-4 leading-relaxed">{post.body}</p>

      <Suspense
        fallback={<div className="text-sm text-gray-500">Loading author...</div>}
      >
        <Author userId={post.userId} />
      </Suspense>
    </Link>
  );
}
