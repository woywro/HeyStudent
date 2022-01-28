import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <Link href={"/post/" + post.slug} passHref key={index}>
          <div style={{ maxWidth: "540px" }}>
            <h5>{post.frontMatter.title}</h5>
            <p>{post.frontMatter.description}</p>
            <p>
              <small>{post.frontMatter.date}</small>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
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
