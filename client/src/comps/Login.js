import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';

function Login(props) {

  const { handleLoginChange } = props;

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="login-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="login-modal">
          Login
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Container className='w-75'>
              <InputGroup className="mb-2">
                <InputGroup.Text>@</InputGroup.Text>
                <FormControl 
                  placeholder="Username" 
                  onChange={handleLoginChange}
                />
              </InputGroup>
              <Form.Group className="mb-3" controlId="newUserPass">
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  onChange={handleLoginChange}
                />
              </Form.Group>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit'>Login</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Login;