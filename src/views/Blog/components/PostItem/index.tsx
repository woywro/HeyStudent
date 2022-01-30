import { StyledPostItem, Title, ImageWrapper } from "./style";
import Link from "next/link";
import Image from "next/image";
import { blogPost } from "../../../../types";

interface Props {
  post: blogPost;
}

export const PostItem = ({ post }: Props) => {
  return (
    <Link href={"/post/" + post.slug} passHref>
      <StyledPostItem>
        <ImageWrapper>
          <Image
            src={post.frontMatter.thumbnail}
            alt={`Cover Image for ${post.frontMatter.title}`}
            layout="fill"
            objectFit="cover"
            loading="lazy"
          />
        </ImageWrapper>
        <Title>{post.frontMatter.title}</Title>
        <p>{post.frontMatter.date}</p>
      </StyledPostItem>
    </Link>
  );
};
