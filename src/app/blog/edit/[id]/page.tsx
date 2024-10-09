"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPosts, updateBlogPost } from "../../../data";

interface BlogPost {
  title: string;
  author: string;
  content: string;
  image?: string;
}

export default function Edit({ params }: { params: { id: string } }) {
  const posts = getPosts();
  const post = posts.find((p) => p.id === parseInt(params.id));

  const [formData, setFormData] = useState<BlogPost>({
    title: post?.title || "",
    author: post?.author || "",
    content: post?.content || "",
    image: post?.image || "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (post?.image) {
      setPreviewImage(post.image);
    }
  }, [post]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, author, content, image } = formData;

    if (!title || !author || !content) {
      alert("All fields are required!");
      return;
    }
    updateBlogPost(parseInt(params.id), { title, author, content, image });
    router.push("/");
  };

  return (
    <div className="flex justify-center py-20">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            required
          />
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover rounded"
              />
            )}
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Update Post
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
