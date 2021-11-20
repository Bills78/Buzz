import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Popup = (props) => {
  const { handleSubmit, handleChange, post, onHide } = props;

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Create A Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor='body'>Message:</Form.Label>
              <Form.Control
                onChange={handleChange}
                defaultValue={post.body}
                type='text'
                name='body'
                required
              />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='warning' onClick={onHide}>Close</Button>
          <Button variant='warning' type='submit'>Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default Popup;