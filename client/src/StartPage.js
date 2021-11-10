import NewUser from './comps/NewUser';
import Login from './comps/Login';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState } from 'react';

axios.defaults.baseURL = 'http://localhost:8080';

const Start = () => {
  const [modalShow, setModalShow] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loginUser, setLoginUser] = useState({
    username: '',
    password: ''
  });

  const handleNewChange = (e) => setNewUser({
    ...newUser,
    [e.target.name]: e.target.value
  });

  const handleLoginChange = (e) => setLoginUser({
    ...loginUser,
    [e.target.name]: e.target.value
  });

  const onNewSubmit = async () => {
    await axios.post('/new-user', {...newUser})
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message));
  };

  const onLoginSubmit = async () => {
    await axios.post('/log-in', {...loginUser})
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  return (
    <Container>
      <Card className='login-interface'>
        <Card.Header>Welcome to BookFace</Card.Header>
        <Card.Body>
          <Container>
            <NewUser 
              handleNewChange={handleNewChange}
              onNewSubmit={onNewSubmit} 
            />
          </Container>
          <div>
            <p>or</p>
          </div>
            <Login
              show={modalShow}
              onHide={() => setModalShow(false)}
              handleLoginChange={handleLoginChange}
              onLoginSubmit={onLoginSubmit}
            />
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Start;