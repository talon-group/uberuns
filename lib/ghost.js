import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
    url: 'https://nordkurve2-newsletter.ghost.io',
    key: '7c1fbbd459ccdae2abb7a26bb6',
    version: "v5.0"
});

export async function getPosts() {
    try {
        const posts = await api.posts.browse({ limit: "all" });
        return posts.map((post) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            html: post.html // Ensure content is included
        }));
    } catch (err) {
        console.error(err);
        return [];
    }
}


export async function getSinglePost(postSlug) {
    try {
        return await api.posts.read({ slug: postSlug });
    } catch (err) {
        console.error(err);
        return null;
    }
}
