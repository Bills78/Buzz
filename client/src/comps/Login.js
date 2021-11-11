import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';

function Login(props) {

  const { handleLoginChange, onLoginSubmit } = props;

  return (
    <Container className='w-75'>
    <h2>Login</h2>
      <Form onSubmit={() => onLoginSubmit('/home')}>
        <InputGroup className='account-input'>
          <InputGroup.Text>@</InputGroup.Text>
          <Form.Control 
            required 
            id='LoginUserName'  
            placeholder='Username'
            name='username'
            onChange={handleLoginChange}
          />
        </InputGroup>
        <Form.Group className='accout-input' controlId='login-Pass'>
          <Form.Control 
            required 
            type='password'   
            placeholder='Password'  
            name='password'
            onChange={handleLoginChange}
            />
        </Form.Group>

        <Button className='account-btn' type='submit'>Login</Button>
      </Form>
    </Container>
  );
};

export default Login;