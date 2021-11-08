import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
// import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';

const NewUser = (props) => {

  const { handleNewChange, onNewSubmit } = props;

  return (
    <Container className='w-75'>
    <h2>Create New Account</h2>
      <Form onSubmit={onNewSubmit}>
        <InputGroup className='create-account-input'>
          <InputGroup.Text>@</InputGroup.Text>
          <Form.Control 
            required 
            id='newUserName'  
            placeholder='Username'
            name='username'
            onChange={handleNewChange}
            />
        </InputGroup>
        <Form.Group className='create-account-input' controlId='newUserEmail'>
          <Form.Control 
            required 
            type='email'  
            placeholder='Enter email'   
            name='email'
            onChange={handleNewChange}
            />
        </Form.Group>
        <Form.Group className='create-account-input' controlId='newUserPass'>
          <Form.Control 
            required 
            type='password'   
            placeholder='Password'  
            name='password'
            onChange={handleNewChange}
            />
        </Form.Group>
        <Button id='create-account-btn' type='submit'>Create Account</Button>
      </Form>
    </Container>
  );
};

export default NewUser;