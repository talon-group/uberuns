"use client";

import { getPosts } from "../../lib/ghost";
import { useEffect, useState } from "react";

interface Post {
    id: string;
    title: string;
}

const IndexPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            const postsData = await getPosts();
            if (postsData) {
                setPosts(postsData);
            }
        }
        fetchPosts();
    }, []);

    return (
        <>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </>
    );
};

export default IndexPage;
