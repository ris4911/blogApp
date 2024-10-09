import BlogList from "./components/BlogList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <Link href="/blog/create">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Add Blog
        </button>
      </Link>
      <BlogList />
    </main>
  );
}
