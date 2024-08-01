"use client";

import Link from "next/link";
import { getPosts } from "../../lib/ghost";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  slug: string;
  html: string;
  feature_image: string; // Include feature image
}

// Helper function to get the first three paragraphs of a post, including images
const getExcerpt = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const paragraphs = doc.querySelectorAll('p, img');
  let excerpt = '';
  let paragraphCount = 0;

  for (let i = 0; i < paragraphs.length && paragraphCount < 3; i++) {
    const element = paragraphs[i];
    if (element.tagName === 'P') {
      paragraphCount++;
    }
    excerpt += element.outerHTML;
  }

  return excerpt;
};

const ShortNewsletterPosts = () => {
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
      <h2 className="text-3xl font-bold text-red-800 mb-4">Newsletter</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 shadow-md rounded-lg transition-shadow duration-200 hover:shadow-lg"
          >
            {post.feature_image && (
              <img
                src={post.feature_image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: getExcerpt(post.html) }} />
              <Link legacyBehavior href={`https://nordkurve2-newsletter.ghost.io/${post.slug}`}>
                <a className="text-blue-500 hover:underline mt-4 block">Read more</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortNewsletterPosts;