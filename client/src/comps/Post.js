import { Card, Container } from "react-bootstrap";

const Post = (props) => {
  const { posts, inspectPost } = props;

  return (
    <Container className="Posts" fluid>
      {posts.map((post) => {
        const createdAt = new Date(post.updatedAt).toDateString();
        return (
          <div key={post._id}>
            <Card
              className="post"
              onClick={() => {
                inspectPost(post._id);
              }}
            >
              <Card.Body>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  @{post.postedBy} | {createdAt}
                </small>
              </Card.Footer>
            </Card>
          </div>
        );
      })}
    </Container>
  );
};

export default Post;
