
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-gray-300 p-4 text-white flex items-center justify-between">
      <h1 className="text-2xl font-bold text-black">BlogPosts Header</h1>
      <div className="flex" style={{ gap: '10px' }}>
        <Link href="/login">
          <button className="bg-yellow-700 px-4 py-2 rounded hover:bg-green-800">Login</button>
        </Link>
        <Link href="/signup">
          <button className="bg-white text-black border-black px-4 py-2 rounded hover:bg-blue-600 hover:text-white">Signup</button>
        </Link>
      </div>
    </header>
  );
}
