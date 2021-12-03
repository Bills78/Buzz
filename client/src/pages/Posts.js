import TopNavbar from "../comps/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../comps/Post";
import Popup from "../comps/Modal";
import Edit from "../comps/Edit";
import Comments from '../comps/Comments'

const Posts = (props) => {
  axios.defaults.baseURL = "http://localhost:8080";
  const token = localStorage.getItem("user");
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [username, setUsername] = useState(null);
  const [comment, setComment] = useState("");
  const [post, setPost] = useState({
    body: "",
    id: "",
    author: "",
    creation: "",
  })
  
  const { BEAPI } = props;

  useEffect(() => {
    axios
      .get(`${BEAPI}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        setPosts(res.data.posts);
        setUsername(res.data.username);
      })
      .catch((err) => console.log(err.message));
    // eslint-disable-next-line
  }, [modalShow, post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const newPost = post.body;
    await axios
      .post(
        "/create-post",
        {
          ...newPost,
        },
        {
          headers: {
            "x-access-token": `${token}`,
          },
        }
      )
      .then(() => {
        setModalShow(false);
        setPost({
          body: "",
        });
      });
  };

  async function handleDelete(postId) {
    await axios
      .delete(`/delete-post/:${postId}`, {
        params: {
          post_id: postId,
        },
        headers: {
          "x-access-token": `${token}`,
        },
      })
      .then((res) => {
        const deletedId = res.data._id;
        setPosts(posts.filter((post) => post._id !== deletedId));
        setPost({
          id: "",
        });
        setShowEdit(false);
      })
      .catch((err) => console.log(err));
  }

  const submitEdit = async () => {
    await axios
      .patch(
        `/edit-post/:${post.id}`, { body: post.body },
        {
          params: {
            post_id: post.id,
          },
          headers: {
            "x-access-token": `${token}`,
          },
        }
      )
      .then(() => {
        setPost({
          body: "",
          id: "",
        });
      });
  };

  const addLike = async (postId, postLikes) => {
    const newLikes = postLikes + 1;
    await axios.all([
      axios.patch('/add-like', { likes: newLikes }, 
        {
          params: {
            post_id: postId,
          },
          headers: {
            "x-access-token": `${token}`,
          },
        })
        .then(() => {
          setPost({
            id: "",
          });
        }),
      axios.patch('add-liked', { postId },
        {
          headers: {
            "x-access-token": `${token}`
          }
        }),
      ]);
  };

  const removeLike = async (postId, postLikes) => {
    setPost({
      id: "",
    });
    const newLikes = postLikes - 1;
    await axios.all([
      axios.patch('/add-like', { likes: newLikes }, 
        {
          params: {
            post_id: postId,
          },
          headers: {
            "x-access-token": `${token}`,
          },
        })
        .then(() => {
          setPost({
            id: "",
          });
        }),
      axios.patch('remove-liked', { postId },
        {
          headers: {
            "x-access-token": `${token}`
          }
        }),
      ]);
  };

  const sendLikes = async (postId, postLikes) => {
    setPost({
      id: 1,
    });
    await axios
      .get(`/check-likes/:${postId}`, {
        params: {
          post_id: postId,
        },
        headers: {
          "x-access-token": `${token}`,
        },
      })
      .then(res => {
        const data = res.data.data;
        if (data === true) {
          return removeLike(postId, postLikes)
        } else if (data === false) {
          return addLike(postId, postLikes)
      };
    });
  };

  const commentFunc = async (postId, postComments, postBody, postedBy, createdAt) => {
    setComments(postComments);
    setCommentShow(true);
    setPost({
      body: postBody,
      id: postId,
      author: postedBy,
      creation: createdAt,
    })

    await axios
      .get(`/all-comments/:${post.id}`, {
        params: {
          post_id: post.id,
        },
        headers: {
          "x-access-token": `${token}`,
        },
      })
      .then(res => {
        console.log(res)
      })
  };
  
  const handleCommentChange = (e) => {
    const { value } = e.target;
    setComment(`${value}`);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    console.log(comment)
    await axios
      .post(
        "/create-comment",
        {
          mainPost: post.id,
          body: comment,
        },
        {
          headers: {
            "x-access-token": `${token}`,
          },
        }
      )
      .then((res) => {
        setComment("");
        setComments("");
        setPost({
          body: "",
          id: "",
          author: "",
          creation: "",
        });
        setCommentShow(false);
        console.log(res);
      })
  };

  return (
    <div>
      {username && <TopNavbar username={username} />}
      <Container className="home-page">
        <Row className="posts-n-add">
          <Col xs={10}>
            {posts && (
              <Post
                posts={posts}
                username={username}
                setShowEdit={setShowEdit}
                setPost={setPost}
                sendLikes={sendLikes}
                commentFunc={commentFunc}
              />
            )}
          </Col>
          <Col className="xtra">
            <Button
              size="lg"
              variant="outline-dark"
              id="addPost"
              onClick={() => {
                setModalShow(true);
              }}
            >
              +
            </Button>

            <Popup
              show={modalShow}
              onHide={() => setModalShow(false)}
              onChange={handleChange}
              onSubmit={handleSubmit}
              post={post.body}
            />

            <Edit
              show={showEdit}
              onHide={() => setShowEdit(false)}
              onChange={handleChange}
              post={post.body}
              submitEdit={submitEdit}
              handleDelete={handleDelete}
              id={post.id}
            />

            <Comments 
              show={commentShow}
              onHide={() => setCommentShow(false)}
              comments={comments}
              body={post.body}
              author={post.author}
              creation={post.creation}
              onSubmit={submitComment}
              onChange={handleCommentChange}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Posts;
