"use client";

import { useEffect, useState } from "react";
import { getPosts } from "../../data";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  content: string;
  image?: string;
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPosts = () => {
      const posts = getPosts();
      const foundPost = posts.find((p) => p.id === parseInt(params.id));
      setPost(foundPost || null);
    };

    fetchPosts();
  }, [params.id]);

  if (!post) {
    return (
      <div className="flex justify-center py-20">
        <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col mb-4">
            <Link
              href="/"
              className="text-blue-500 hover:underline inline-block"
            >
              ← Back to Home
            </Link>
            <p className="py-8 text-lg">Blog Not Found!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-20">
      <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-blue-500 hover:underline inline-block">
            ← Back to Home
          </Link>
          <Link
            href={`/blog/edit/${post.id}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 inline-block"
          >
            Edit Post
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-2">Author: {post.author}</p>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="mb-4 w-52 h-52 object-cover rounded"
            style={{ maxHeight: "300px" }}
          />
        )}
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
}
