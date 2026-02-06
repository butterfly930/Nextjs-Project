interface Props {
  params: { postId: string };
}

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache", // SSG
  });
  return res.json();
}

export default async function Posts() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post: any) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}