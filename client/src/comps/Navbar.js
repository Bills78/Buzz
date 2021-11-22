import { 
  Navbar,
  Container,
  Nav,
  Button
} from "react-bootstrap"
import { useNavigate } from 'react-router-dom';

const TopNavbar = (props) => {

  const navigate = useNavigate();
  const { username } = props;

  return (
    <Navbar bg='warning'>
      <Container>
        <Navbar.Brand href='/home'>Buzz</Navbar.Brand>
          <Nav>
            <Nav.Item>
              <Nav.Link href='/home'>The Hive</Nav.Link>
            </Nav.Item> 
            <Nav.Item>
              <Nav.Link href='/profile'>
                  {username}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Button 
                variant='dark' 
                onClick={() => {
                  localStorage.removeItem('user');
                  navigate('/')
                  }}>Logout</Button>
            </Nav.Item>
          </Nav>
      </Container>
    </Navbar>
  )
};

export default TopNavbar