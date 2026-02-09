export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function fetchPosts(search?: string): Promise<Post[]> {
  let posts: Post[] = [];

  try {
    if (search && !isNaN(Number(search))) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${search}`,
        { cache: "force-cache" },
      );

      if (!response.ok) throw new Error("Failed to fetch post");

      const post = await response.json();
      posts = [post]; // wrap in array for consistency
    } else {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        { cache: "force-cache" },
      );

      if (!response.ok) throw new Error("Failed to fetch posts");

      posts = await response.json();

      if (search) {
        posts = posts.filter((post) =>
          post.title.toLowerCase().includes(search.toLowerCase()),
        );
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts");
  }

  return posts;
}
