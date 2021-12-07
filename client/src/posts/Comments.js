import { Card, Modal, Button, Form } from "react-bootstrap";
import moment from "moment";

const Comments = (props) => {

  const { comments, post, handleChange, onSubmit } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Form>
      <Modal.Body className="comment-modal-body">
          <div className="text-muted comment-modal-head">
            <div>@{post.author}</div>
            <div>{post.creation}</div>
          </div>        
          {post.body}
        </Modal.Body>
        <Modal.Footer className="all-comments">
            <div className="comment">
              <input
                placeholder="write a new comment"
                onChange={handleChange}
                name="body"
              />
              <Button 
                className="post-comment-btn" 
                size="sm" 
                variant="warning"
                onClick={onSubmit}
                >
              post
              </Button>
            </div>
          {comments && comments.map(comment => {
            const createdAt = moment(comment.createdAt).startOf('second').fromNow();
            return (
              <Card className="comment" key={comment._id}>
                <div className="comment-header">
                  <div>@{comment.postedBy}</div>
                  <div>Likes: {comment.likes}</div>
                  <div>{createdAt}</div>
                </div>
                <div className="comment-body">
                  {comment.body}
                </div>
                <Button
                  onClick={(e) => {
                    e.data = {
                      whereTo: 'comment-likes',
                      commentId: comment._id,
                      commentLikes: comment.likes,
                    };
                  }}
                  size="sm"
                  variant="warning"
                >Like</Button>
              </Card>
            )
          })}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Comments;
