"use client";

import Link from "next/link";
import { getPosts } from "../../lib/ghost";
import { useEffect, useState } from "react";

interface Post {
    id: string;
    title: string;
    slug: string;
    html: string; // Include content
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
                    <Link key={post.id} legacyBehavior href={`/newsletter/${post.slug}`}>
                        <li>
                            <h2>{post.title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: post.html }} />
                        </li>
                    </Link>
                ))}
            </ul>
        </>
    );
};

export default IndexPage;