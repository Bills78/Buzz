import { Card, Container, Button } from "react-bootstrap";

const Post = (props) => {
  const { posts, username, handleDelete, setShowEdit, setPost, setId } = props;

  const Buttons = (props) => {
    if (username === props.postUser) {
      return (
        <Card.Footer>
          <Button
            variant="warning"
            onClick={() => {
              setShowEdit(true);
              setPost(props.postBody);
              setId(props.postId);
            }}
          >
            Edit
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              handleDelete(props.postId);
            }}
          >
            Delete
          </Button>
        </Card.Footer>
      );
    }
    return null;
  };

  return (
    <Container className="Posts" fluid>
      {posts.map((post) => {
        const createdAt = new Date(post.updatedAt).toDateString();
        return (
          <div key={post._id}>
            <Card className="post">
              <Card.Header>
                <small className="text-muted">
                  @{post.postedBy} | {createdAt}
                </small>
              </Card.Header>
              <Card.Body>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
              <Buttons
                postUser={post.postedBy}
                postId={post._id}
                postBody={post.body}
              />
            </Card>
          </div>
        );
      })}
    </Container>
  );
};

export default Post;
