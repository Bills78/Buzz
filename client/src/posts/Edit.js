import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Edit = (props) => {
  const { onSubmit, handleChange, post, onClick, id } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="body">Message:</Form.Label>
            <Form.Control
              onChange={handleChange}
              defaultValue={post}
              type="text"
              name="body"
              as="textarea"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => {
              onClick(id);
            }}
          >
            Delete Post
          </Button>
          <Button variant="warning" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Edit;
