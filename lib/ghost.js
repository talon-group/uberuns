"use client"

import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
    url: 'https://copernic-space.ghost.io',
    key: '05d8bfa29314639ca789050ac5',
    version: "v5.0"
});

export async function getPosts() {
    return await api.posts
      .browse({
        limit: "all"
      })
      .catch(err => {
        console.error(err);
      });
}

export async function getSinglePost(postSlug) {
  return await api.posts
    .read({
      slug: postSlug
    })
    .catch(err => {
      console.error(err);
    });
}