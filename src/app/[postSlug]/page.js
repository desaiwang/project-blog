import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";

async function BlogPost({ params }) {
  const { postSlug } = await params;

  const blogPost = await loadBlogPost(postSlug);
  console.log("blogPost", blogPost);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogPost.frontmatter.title}
        publishedOn={blogPost.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        {<MDXRemote source={blogPost.content} />}{" "}
      </div>
    </article>
  );
}

export default BlogPost;
