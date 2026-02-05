import Header from "../../components/header/header";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

type PostProps = {
  post: {
    id: number;
    title: string;
    body: string;
  };
  error?: boolean;
};

function Post({ post, error }: PostProps) {
    const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <span className="text-lg text-gray-700">Loading...</span>
      </div>
    );
  }

  if (error || !post?.id) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-2xl mx-auto mt-20 px-4">
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Sorry, there was a problem loading this post.
          </h2>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
<main className="max-w-2xl mx-auto mt-20 px-4">
  <div className="inline-block text-xl font-semibold text-gray-700 mb-2 rounded-full shadow-[0_0_10px_2px_rgba(239,68,68,0.5)] border border-blue-800 px-4 py-2">
    {post.id}
  </div>
  <h2 className="text-3xl font-bold mb-4 text-gray-900">{post.title}</h2>
  <p className="text-gray-700 text-lg">{post.body}</p>
</main>
    </div>
  );
}
export default Post;

export async function getStaticPaths() {
  return {
    paths: [], 
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.postId}`,
    );
    if (!response.ok) {
      return { props: { error: true } };
    }
    const data = await response.json();
    if (!data.id) {
      return { props: { error: true } };
    }
    return {
      props: {
        post: data,
      },
    };
  } catch {
    return { props: { error: true } };
  }
}
