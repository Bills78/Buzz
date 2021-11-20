import TopNavbar from '../comps/Navbar';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { useEffect, useState } from "react";
import Post from '../comps/Post';
import Popup from '../comps/Modal';
import InspectModal from '../comps/Inspect';

const Profile = () => {

  axios.defaults.baseURL = 'http://localhost:8080';
  const token = localStorage.getItem('user');
  const [posts, setPosts] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [inspectShow, setInspectShow] = useState(false);
  const [single, setSingle] = useState(null);
  const [post, setPost] = useState({
    body: ''
  });

  useEffect(() => {
    axios.get('/profile-posts', {
      headers: {
        'x-access-token': `${token}`
      }
    })
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.log(err.message));
      // eslint-disable-next-line
  }, [modalShow, inspectShow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const newPost = post;
    await axios.post('/create-post', {
        ...newPost
      }, {
        headers: {
          'x-access-token': `${token}`
        }
      })
      .then(res => {
        setPost({body: ''});
      })
      .then(setModalShow(false));
  };

  const inspectPost = async (postId) => {
    await axios.get('/profile-posts', {
      headers: {
        'x-access-token': `${token}`
      },
    })
    .then(res => {
      setPosts(res.data);
      setSingle(posts.filter(post => post._id === postId));
    })
    .then(res => {
      setInspectShow(true);
    })
    .catch(err => console.log(err));
  };

  async function handleDelete(postId) {
    await axios.delete(`/delete-post/:${postId}`, {
      params: {
        post_id: postId
      },
      headers: {
        'x-access-token': `${token}`
      },
    })
    .then(res => {
      const posts = res.data;
      console.log(posts);
      setPosts(posts);
    })
    .catch(err => console.log(err));
  };

  return (
    <div>
      <TopNavbar />
      <Container className='home-page'>
        <Row>
          <Col xs={10}>{ 
            posts && 
            <Post 
              posts={posts}
              inspectPost={inspectPost}
            />}
          </Col>
          <Col className='xtra'>
            <Button 
              size='lg' 
              variant='outline-dark' 
              id='addPost'
              onClick={() => {
                setModalShow(true);
              }}>
              + 
              </Button>

              <Popup 
                show={modalShow}
                onHide={() => setModalShow(false)}
                onChange={handleChange}
                onSubmit={handleSubmit}
                post={post}
              />

              { single && <InspectModal 
                show={inspectShow}
                onHide={() => setInspectShow(false)}
                single={single}
                handleDelete={handleDelete}
              />}
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default Profile;