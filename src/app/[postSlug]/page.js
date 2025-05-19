import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BLOG_TITLE } from "@/constants";
import CodeSnippet from "@/components/CodeSnippet";
import CircularColorsDemo from "@/components/CircularColorsDemo";

const DivisionGroupsDemo = React.lazy(() =>
  import("@/components/DivisionGroupsDemo")
);

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const blogPost = await loadBlogPost(postSlug);

  return {
    title: `${blogPost.frontmatter.title} - ${BLOG_TITLE}`,
    description: blogPost.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;

  const { frontmatter, content } = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        {
          <MDXRemote
            source={content}
            components={{
              pre: CodeSnippet,
              DivisionGroupsDemo,
              CircularColorsDemo,
            }}
          />
        }
      </div>
    </article>
  );
}

export default BlogPost;
