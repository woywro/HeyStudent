import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import imageSize from "rehype-img-size";
import styled from "styled-components";

const ImageWrapper = styled.div`
  margin: 10px;
`;

const StyledPost = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const components = {
  img: (props) => (
    <ImageWrapper>
      <Image {...props} layout="responsive" loading="lazy" />
    </ImageWrapper>
  ),
};

const PostPage = ({
  frontMatter: { title, date, description, thumbnail },
  mdxSource,
}) => {
  return (
    <StyledPost>
      <Head>
        <meta name="description" content={description} key="description" />
        <meta
          property="og:description"
          content={description}
          key="ogDescription"
        />
      </Head>
      <Image src={thumbnail} width="600px" height="200px" objectFit="cover" />
      <MDXRemote {...mdxSource} components={components} />
    </StyledPost>
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
