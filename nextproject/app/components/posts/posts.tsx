import { useState, useEffect } from "react";

type Posts = {
    userId: number,
    id: number, 
    title: string, 
    body: string
}

export default function Posts() {
    const [posts, setPosts] = useState<Posts[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if(!response.ok) throw new Error('Failed to fetch posts');
            const data = await response.json();
            setPosts(data);    
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }else {
                setError('An unknown error occurred');
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);


    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Blog Posts</h2>
            <ul className="space-y-4">
                <li className="border-b pb-4">
                    <h3 className="text-2xl font-semibold">First Post</h3>
                    <p className="text-gray-600">This is the summary of the first blog post.</p>
                </li>
                <li className="border-b pb-4">
                    <h3 className="text-2xl font-semibold">Second Post</h3>
                    <p className="text-gray-600">This is the summary of the second blog post.</p>
                </li>
                <li className="border-b pb-4">
                    <h3 className="text-2xl font-semibold">Third Post</h3>
                    <p className="text-gray-600">This is the summary of the third blog post.</p>
                </li>
            </ul>
        </div>
    )
}