import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import imageSize from "rehype-img-size";
import styled from "styled-components";

const components = {
  img: (props) => (
    // height and width are part of the props, so they get automatically passed here with {...props}
    <Image {...props} layout="responsive" loading="lazy" />
  ),
};

const PostPage = ({ frontMatter: { title, date }, mdxSource }) => {
  return (
    <div>
      <h1>{title}</h1>
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
};

const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      // use the image size plugin, you can also specify which folder to load images from
      // in my case images are in /public/images/, so I just prepend 'public'
      rehypePlugins: [[imageSize, { dir: "public" }]],
    },
  });

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
};

export { getStaticProps, getStaticPaths };
export default PostPage;
