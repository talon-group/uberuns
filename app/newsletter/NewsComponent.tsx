"use client";

import Link from "next/link";
import { getPosts } from "../../lib/ghost";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  slug: string;
  html: string; // Include content
};
 
const NewsletterPosts = () => {
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-red-800 mb-4">News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 shadow-md rounded-lg transition-shadow duration-200 hover:shadow-lg"
          >
            {/* <Link href={`/newsletter/${post.slug}`}> */}
              <a className="block">
                <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
              </a>
            {/* </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsletterPosts;