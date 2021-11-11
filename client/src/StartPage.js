import NewUser from './comps/NewUser';
import Login from './comps/Login';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState, useHistory } from 'react';

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
  // const history = useHistory();

  const handleNewChange = (e) => setNewUser({
    ...newUser,
    [e.target.name]: e.target.value
  });

  const handleLoginChange = (e) => setLoginUser({
    ...loginUser,
    [e.target.name]: e.target.value
  });

  const onNewSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/new-user', {...newUser})
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message));
  };

  const onLoginSubmit = async (e, path) => {
    e.preventDefault();
    await axios.post('/log-in', {...loginUser})
      .then(res => {
        console.log(res.data);
        useHistory.push(path);
      })
      .catch(err => console.log(err.message));
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