import { Card, Modal, Button, Form } from "react-bootstrap";
import uniqid from "uniqid";

const Comments = (props) => {

  const { comments, body, author, creation, onSubmit, handleChange } = props;

  const commentAuthor = 'bill';
  const commentCreation = '1 day ago';
  
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
            <div>@{author}</div>
            <div>{creation}</div>
          </div>        
          {body}
        </Modal.Body>
        <Modal.Footer className="all-comments">
            <div className="comment">
              <textarea
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
            return (
              <Card className="comment" key={uniqid()}>
                <div className="comment-header">
                  <div>@{commentAuthor}</div>
                  <div>{commentCreation}</div>
                </div>
                {comment}
              </Card>
            )
          })}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Comments;
