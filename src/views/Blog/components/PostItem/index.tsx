import { StyledPostItem, Title, ImageWrapper } from "./style";
import Link from "next/link";
import Image from "next/image";

export const PostItem = ({ post }) => {
  return (
    <Link href={"/post/" + post.slug} passHref>
      <StyledPostItem>
        <ImageWrapper>
          <Image
            src={post.frontMatter.thumbnail}
            alt={`Cover Image for ${post.title}`}
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
