import { StyledPostItem, Title, ImageWrapper } from "./style";
import Link from "next/link";
import Image from "next/image";
import { blogPost } from "../../../../types";
import { Text } from "../../../../components/Text";

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
        <Text>{post.frontMatter.title}</Text>
        <Text size="small">{post.frontMatter.date}</Text>
      </StyledPostItem>
    </Link>
  );
};
