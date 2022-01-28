import { StyledPostItem } from "./style";
import Link from "next/link";
export const PostItem = ({ post }) => {
  return (
    <Link href={"/post/" + post.slug} passHref>
      <StyledPostItem>
        <div style={{ maxWidth: "540px" }}>
          <h5>{post.frontMatter.title}</h5>
          <p>{post.frontMatter.description}</p>
          <p>
            <small>{post.frontMatter.date}</small>
          </p>
        </div>
      </StyledPostItem>
    </Link>
  );
};
