import { 
  Navbar,
  Container,
  Nav
} from "react-bootstrap"

const topNavbar = (props) => {

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
              <Nav.Link href='/Profile'>
                  {username}
              </Nav.Link>
            </Nav.Item>
          </Nav>
      </Container>
    </Navbar>
  )
};

export default topNavbar