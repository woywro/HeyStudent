import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import imageSize from "rehype-img-size";
import styled from "styled-components";
import { Text } from "../../components/Text";
import { PageTopBar } from "../../components/PageTopBar";
import breakpoints from "../../theme/breakpoints";
import { shadow } from "../../mixnins/shadow";

const ImageWrapper = styled.div`
  width: 600px;
  position: relative;
  margin: 10px;
  background: red;
  height: 150px;
`;

const HeaderImageWrapper = styled.div`
  width: 100%;
  position: relative;
  margin: 10px;
  height: 200px;
`;

const StyledPost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  @media only screen and ${breakpoints.device.xs} {
    width: 100%;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 70%;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin: 10px;
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
  @media only screen and ${breakpoints.device.xs} {
    width: 90%;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 70%;
  }
`;

const Title = styled.h1`
  font-size: 28px;
`;

const PostContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-flow: column;
  font-size: 16px;
  padding: 20px;
  @media only screen and ${breakpoints.device.xs} {
    width: 90%;
  }
  @media only screen and ${breakpoints.device.lg} {
    width: 60%;
  }
`;

const components = {
  img: (props) => (
    <ImageWrapper>
      <Image {...props} objectFit="contain" loading="lazy" />
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
      <Header>
        <HeaderImageWrapper>
          <Image
            src={thumbnail}
            layout="fill"
            objectFit="cover"
            loading="lazy"
          />
        </HeaderImageWrapper>
        <Title>{title}</Title>
      </Header>
      <PostContent>
        <MDXRemote {...mdxSource} components={components} />
      </PostContent>
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
