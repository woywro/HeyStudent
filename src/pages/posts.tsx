import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Blog } from "../views/Blog";

const Posts = ({ posts }) => {
  return <Blog posts={posts} />;
};

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join(path.join("posts")));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      frontMatter,
      slug: filename.split(".")[0],
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default Posts;
