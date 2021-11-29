import moment from "moment";
import { Card, Container, Button } from "react-bootstrap";

const Post = (props) => {
  const { posts, username, setShowEdit, setPost, setId, sendLikes } = props;

  const Buttons = (props) => {
    if (username === props.postUser) {
      return (
        <>
          <Button
            className="post-btn"
            size="sm"
            variant="light"
            onClick={() => {
              setShowEdit(true);
              setPost(props.postBody);
              setId(props.postId);
            }}>
            Edit
          </Button>{" "}
        </>
      );
    }
    return null;
  };

  return (
    <Container className="Posts" fluid>
      {posts.map((post) => {
        const createdAt = moment(post.createdAt).startOf('second').fromNow();
        return (
          <div key={post._id}>
            <Card className="post">
              <Card.Body>
                <Card.Text className="post-header">
                  <small className="text-muted">@{post.postedBy}</small>{" "}
                  <small>Likes: {post.likes}</small>{" "}
                  <small className="text-muted">{createdAt}</small>
                </Card.Text>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
              <Card.Footer className="bottom-post-btns text-muted">
                  <Button
                    onClick={() => {
                      sendLikes(post._id, post.likes)
                    }}
                    size="sm"
                    variant="light"
                    className="post-btn"
                  >Like</Button>
                  <Buttons
                    postUser={post.postedBy}
                    postId={post._id}
                    postBody={post.body}
                  />
              </Card.Footer>
              {/* <Form>
                <Card.Footer>
                 <input></input>
                </Card.Footer>
              </Form> */}
            </Card>
          </div>
        );
      })}
    </Container>
  );
};

export default Post;
