import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import uniqid from "uniqid";

const InspectModal = (props) => {
  const { 
    handleChange,
    handleSubmit,
    username, 
    onHide, 
    single, 
    handleDelete, 
    editContent, 
    isEditing, 
    ...rest 
  } = props;

  const LeButton = (props) => {
    return (
      <Modal.Footer>
        <Button variant="warning" onClick={() => {
          editContent(props.postBody)
          }}>
          Update
        </Button>
        <Button
          variant="dark"
          onClick={() => {
            handleDelete(props.postId);
            onHide();
          }}
        >Delete</Button>
      </Modal.Footer>
    );
  };

  const NotLeButton = (props) => {
    return null;
  };

  const IsUser = (props) => {
    if (props.username === props.postUser) {
      return <LeButton postId={props.postId} postBody={props.postBody} />;
    }
    return <NotLeButton />;
  };

  const EditPost = (props) => {
    if (isEditing) {
      return (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="body">Message:</Form.Label>
            <Form.Control
              onChange={handleChange}
              defaultValue={props.postBody}
              type="text"
              name="body"
              required
            />
          </Form.Group>
          <Button variant="warning" type="submit">
            Submit
          </Button>
      </Form>
      )
    } else {
      return (
        <p>{props.postBody}</p>
      )
    }
  }

  return (
    <div>
      {single.map((post) => {
        return (
          <div key={uniqid()}>
            <Modal
              {...rest}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              onHide={onHide}
            >
              <Modal.Header closeButton>@{post.postedBy}</Modal.Header>
              <Modal.Body>
                {<EditPost postBody={post.body} />}
                {/* <p>{post.body}</p> */}
              </Modal.Body>
              <IsUser
                username={username}
                postUser={post.postedBy}
                postId={post._id}
                postBody={post.body}
              />
            </Modal>
          </div>
        );
      })}
    </div>
  );
};

export default InspectModal;
