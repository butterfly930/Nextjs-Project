export default function Home() {
  return (
    <div className="p-4 max-w-7xl mx-auto text-center mt-50">
      <h1 className="text-3xl font-extrabold mb-18 mt-10 ">
        Welcome to the NextJs Blog Posts Web
      </h1>
      <p className="text-gray-800 mb-4 leading-relaxed text-lg">
        This is a simple blog posts application built with Next.js. You can view
        a list of blog posts and their authors.
      </p>
      <p className="bg-gray-300 rounded-[30%] mt-10 text-black text-2xl">
        Add on the https /posts to see all posts and /posts/[id] to see a
        specific post
      </p>
    </div>
  );
}
