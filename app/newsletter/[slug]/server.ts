import PostClientComponent from "./page";

interface Params {
    params: {
        slug: string;
    };
}

const ServerComponent = ({ params }: Params) => {
    return <PostClientComponent slug={params.slug} />;
}

export async function generateStaticParams() {
    const posts = await getPosts();

    return posts.map((post: Post) => ({
        slug: post.slug,
    }));
}

export default ServerComponent;
