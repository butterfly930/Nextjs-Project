import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-800 pt-4 pb-4 text-lg text-white">
      <div className="container mx-auto flex items-center justify-between py-4 ">
        <Link
          href="/"
          className="px-4 py-2 rounded bg-blue-700 hover:bg-white hover:text-blue-800 active:bg-blue-900 active:text-white transition-colors shadow-2xl shadow-black"
        >
          Home
        </Link>

        <Link
          href="/forum"
          className="px-4 py-2 rounded bg-blue-700 hover:bg-white hover:text-blue-800 active:bg-blue-900 active:text-white transition-colors shadow-2xl shadow-black"
        >
          Forum
        </Link>

        <Link
          href="/contact"
          className="px-4 py-2 rounded bg-blue-700 hover:bg-white hover:text-blue-800 active:bg-blue-900 active:text-white transition-colors shadow-2xl shadow-black"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
