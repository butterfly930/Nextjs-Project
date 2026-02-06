type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export default async function PostsSequential() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts: Post[] = await response.json();

    const filteredPosts = posts.filter((post) => post.id %10 === 1); // Limit to first 10 posts for performance

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-3xl font-extrabold mb-8 ">Blogg Postssss</h1>
            <div>
                {filteredPosts.map((post) => (
                 <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-3 text-gray-800 leading-tight ">
                        {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">{post.body}</p>
                    <p>Author name to be fetched</p>
                 </div>
                ))
                }
            </div>
        </div>

    ) 
}