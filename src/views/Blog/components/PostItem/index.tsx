import { StyledPostItem } from "./style";
import Link from "next/link";
import Image from "next/image";

export const PostItem = ({ post }) => {
  return (
    <Link href={"/post/" + post.slug} passHref>
      <StyledPostItem>
        <div style={{ maxWidth: "540px" }}>
          <h5>{post.frontMatter.title}</h5>
          <p>{post.frontMatter.description}</p>
          <Image
            src={post.frontMatter.thumbnail}
            alt={`Cover Image for ${post.title}`}
            width="400px"
            height="300px"
            loading="lazy"
          />
          <p>
            <small>{post.frontMatter.date}</small>
          </p>
        </div>
      </StyledPostItem>
    </Link>
  );
};
