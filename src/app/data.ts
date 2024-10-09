export interface BlogPost {
    id: number;
    title: string;
    author: string;
    content: string;
    image?: string; // Make image optional
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "First Blog Post",
        author: "Author One",
        content: "This is the content of the first blog post. It provides an overview of the topic.",
        image: "", // Optional field for image
    },
    {
        id: 2,
        title: "Second Blog Post",
        author: "Author Two",
        content: "This is the content of the second blog post. It covers additional insights.",
        image: "",
    },
    {
        id: 3,
        title: "Third Blog Post",
        author: "Author Three",
        content: "This is the content of the third blog post. It includes more detailed analysis.",
        image: "",
    },
    {
        id: 4,
        title: "Fourth Blog Post",
        author: "Author Four",
        content: "This is the content of the fourth blog post. It covers some more insights.",
        image: "",
    },
    {
        id: 5,
        title: "Fifth Blog Post",
        author: "Author Five",
        content: "This is the content of the fifth blog post. It provides additional information.",
        image: "",
    },
    {
        id: 6,
        title: "Sixth Blog Post",
        author: "Author Six",
        content: "This is the content of the sixth blog post. It discusses various points.",
        image: "",
    },
];
let posts: BlogPost[] = [...blogPosts];

export const addBlogPost = (newPost: Omit<BlogPost, 'id'>) => {
    const id = posts.length + 1; 
    const postWithId: BlogPost = { id, ...newPost };
    posts.push(postWithId);
    return posts;
};

export const updateBlogPost = (id: number, updatedPost: Partial<Omit<BlogPost, 'id'>>) => {
    const postIndex = posts.findIndex((p) => p.id === id);
    if (postIndex !== -1) {
        posts[postIndex] = { ...posts[postIndex], ...updatedPost };
    }
    return posts;
};

export const getPosts = () => posts;
