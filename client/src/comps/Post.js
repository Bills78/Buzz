import moment from "moment";
import { Card, Container, Button } from "react-bootstrap";

const Post = (props) => {
  const { posts, username, setShowEdit, setPost, sendLikes, commentFunc } = props;

  const Buttons = (props) => {
    if (username === props.postUser) {
      return (
        <>
          <Button
            className="post-btn"
            size="sm"
            variant="warning"
            onClick={() => {
              setShowEdit(true);
              setPost({
                body: props.postBody,
                id: props.postId,
              });
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
                    variant="warning"
                    className="post-btn"
                  >Like</Button>
                  <Button                    
                    onClick={() => {
                      commentFunc(post._id, post.comments, post.body, post.postedBy, createdAt);
                    }}
                    size="sm"
                    variant="warning"
                    className="post-btn">Comments</Button>
                  <Buttons
                    postUser={post.postedBy}
                    postId={post._id}
                    postBody={post.body}
                  />
              </Card.Footer>
            </Card>
          </div>
        );
      })}
    </Container>
  );
};

export default Post;
