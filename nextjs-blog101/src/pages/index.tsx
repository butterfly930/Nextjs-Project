import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/header/header";
import { Fragment } from "react/jsx-runtime";
import Link from "next/link";
import Footer from "@/components/footer/footer";
import PostList from "./posts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <Fragment>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <h1 className="text-4xl font-bold mb-4 text-center text-gray-900 mt-20">
            Welcome to My Blog
          </h1>
          <p className="text-lg text-gray-900 text-center">
            This is a simple blog built with Next.js and Tailwind CSS.
          </p>
          <div className="flex justify-center mt-8">
            <Link
              href="/posts"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Go to Posts
            </Link>
          </div>
        </main>
        <PostList posts={[]} />
        <Footer/>
      </div>
    </Fragment>
  );
}
