"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getPosts } from "../data";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  content: string;
}

const ITEMS_PER_PAGE = 3;

export default function BlogList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    let fetchPosts = getPosts();
    setPosts(fetchPosts.sort((a, b) => b.id - a.id));
  }, []);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">Author: {post.author}</p>
            <p className="text-gray-700 mb-4">
              {post.content
                ? `${post.content.substring(0, 100)}...`
                : "No content available"}
            </p>
            <Link
              href={`/blog/${post.id}`}
              className="text-blue-500 font-semibold hover:underline"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-white ${
            currentPage === 1 ? "bg-gray-400" : "bg-blue-500"
          } rounded transition duration-200 hover:bg-blue-600`}
        >
          Previous
        </button>
        <span className="self-center text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-white ${
            currentPage === totalPages ? "bg-gray-400" : "bg-blue-500"
          } rounded transition duration-200 hover:bg-blue-600`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
