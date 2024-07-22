import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
    url: 'https://copernic-space.ghost.io',
    key: '05d8bfa29314639ca789050ac5',
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
