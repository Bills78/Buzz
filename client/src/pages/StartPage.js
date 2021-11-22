import NewUser from "../auth/NewUser";
import Login from "../auth/Login";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080";

const Start = () => {
  let navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });

  const handleNewChange = (e) =>
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });

  const handleLoginChange = (e) =>
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });

  const onNewSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/new-user", { ...newUser })
      .then((res) => {
        localStorage.setItem("user", res.data.token);
        navigate("/home");
      })
      .catch((err) => console.log(err.response.data.message));
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/log-in", { ...loginUser })
      .then((res) => {
        localStorage.setItem("user", res.data.token);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <Container>
      <Card bg="warning" className="login-interface">
        <Card.Header>Welcome to Buzz</Card.Header>
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
  );
};

export default Start;
