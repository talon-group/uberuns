// app/newsletter/[slug]/page.tsx

import { getSinglePost, getPosts } from '../../../lib/ghost';

interface Post {
  title: string;
  html: string;
}

interface Props {
  post: Post;
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getSinglePost(params.slug);

  if (!post) {
    // Handle post not found, maybe throw a 404 error or redirect
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

// Generate static params
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default PostPage;