import TopNavbar from "../posts/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../posts/Post";
import Popup from "../posts/Modal";
import Edit from "../posts/Edit";
import Comments from '../posts/Comments'

const Posts = (props) => {
  axios.defaults.baseURL = "http://localhost:8080";
  const token = localStorage.getItem("user");
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [username, setUsername] = useState(null);
  const [comment, setComment] = useState({
    body: "",
    likes: "",
  });
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

  const addLike = async (whereTo, postId, postLikes) => {
    const newLikes = postLikes + 1;
    await axios.all([
      axios.patch(`/${whereTo}/add-like`, { likes: newLikes }, 
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
      axios.patch(`/${whereTo}/add-liked`, { postId },
        {
          headers: {
            "x-access-token": `${token}`
          }
        }),
      ]);
  };

  const removeLike = async (whereTo, postId, postLikes) => {
    setPost({
      id: "",
    });
    const newLikes = postLikes - 1;
    await axios.all([
      axios.patch(`${whereTo}/add-like`, { likes: newLikes }, 
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
      axios.patch(`${whereTo}/remove-liked`, { postId },
        {
          headers: {
            "x-access-token": `${token}`
          }
        }),
      ]);
  };

  const sendLikes = async (e, whereTo, postId, postLikes) => {
    setPost({
      id: 1,
    });
    await axios
    .get(`/check-likes/${whereTo}/:${postId}`, {
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
        return removeLike(whereTo, postId, postLikes)
      } else if (data === false) {
        return addLike(whereTo, postId, postLikes)
    };
  });
  };

  const commentFunc = async (postId, postBody, postedBy, createdAt) => {
    setCommentShow(true);
    setPost({
      body: postBody,
      id: postId,
      author: postedBy,
      creation: createdAt,
    })

    await axios
      .get(`/all-comments/:${postId}`, {
        params: {
          post_id: postId,
        },
        headers: {
          "x-access-token": `${token}`,
        },
      })
      .then(res => {
        setComments(res.data)
      })
  };
  
  const handleCommentChange = (e) => {
    const { value } = e.target;
    setComment({
      body: `${value}`,
    });
  };

  const submitComment = async () => {
    await axios
      .post(
        "/create-comment",
        {
          mainPost: post.id,
          body: comment.body,
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
              onSubmit={submitEdit}
              onClick={handleDelete}
              id={post.id}
            />

            <Comments 
              show={commentShow}
              onHide={() => setCommentShow(false)}
              comments={comments}
              post={post}
              onSubmit={submitComment}
              onChange={handleCommentChange}
              onClick={sendLikes}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Posts;
