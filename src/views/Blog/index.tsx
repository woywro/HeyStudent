import { PostItem } from "./components/PostItem";
import { Container } from "./style";
import { PageTopBar } from "../../components/PageTopBar";

export const Blog = ({ posts }) => {
  return (
    <Container>
      <PageTopBar title="blog" />
      {posts.map((post) => (
        <PostItem post={post} />
      ))}
    </Container>
  );
};
