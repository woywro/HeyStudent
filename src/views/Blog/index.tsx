import { PostItem } from "./components/PostItem";
import { Container } from "./style";
import { PageTopBar } from "../../components/PageTopBar";
import { PostList } from "./style";

export const Blog = ({ posts }) => {
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
