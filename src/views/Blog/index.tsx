import { PostItem } from "./components/PostItem";
import { Container } from "./style";
import { PageTopBar } from "../../components/PageTopBar";
import { PostList } from "./style";
import { blogPost } from "../../types";

interface Props {
  posts: blogPost[];
}

export const Blog = ({ posts }: Props) => {
  return (
    <Container>
      <PageTopBar title="Blog" />
      <PostList>
        {posts.map((post) => (
          <PostItem post={post} />
        ))}
      </PostList>
    </Container>
  );
};
