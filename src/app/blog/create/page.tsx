"use client"; // This line must be at the top

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addBlogPost } from "../../data";

interface BlogPost {
  title: string;
  author: string;
  content: string;
  image?: string;
}

export default function Create() {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost>({
    title: "",
    author: "",
    content: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const imageFile = (e.target as any).image.files[0];
    if (imageFile) {
      formData.append("image", imageFile);
    }
    addBlogPost(post);
    console.log("Blog Post Created:", post);
    router.push("/");
    setPost({ title: "", author: "", content: "", image: "" });
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="author">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={post.author}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            rows={5}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {post.image && (
          <img
            src={post.image}
            alt="Preview"
            className="w-24 h-24 object-cover my-2"
          />
        )}
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Blog Post
        </button>
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2 ms-3 text-white bg-gray-500 rounded hover:bg-gray-600 transition duration-200"
        >
          Back
        </button>
      </form>
    </div>
  );
}
