import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import uniqid from 'uniqid';

const InspectModal = (props) => {

  const { 
      username, 
      onHide, 
      single, 
      handleDelete, 
      editContent, 
      ...rest 
    } = props;

  const LeButton = (props) => {
    return (
      <Modal.Footer>
        <Button variant='warning' onClick={editContent}>Update</Button>
        <Button variant='dark' onClick={() => {
          console.log(props.postId)
          handleDelete(props.postId);
          onHide();
        }}>Delete</Button>
      </Modal.Footer>
    )
  };

  const NotLeButton = (props) => {
    return null
  }

  const IsUser = (props) => {
    if (props.username === props.postUser) {
      return <LeButton postId={props.postId}/>
      }
    return <NotLeButton />
  }

  return (
    <div>
      {single.map(post => {
          return <div key={uniqid()}>
            <Modal
              {...rest}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              onHide={onHide}
            >
            <Modal.Header closeButton>
              @{post.postedBy}
            </Modal.Header>
              <Modal.Body>
                <p>{post.body}</p>
              </Modal.Body>
                <IsUser 
                  username={username}
                  postUser={post.postedBy}
                  postId={post._id}
                />
            </Modal>
          </div>
        })
      }
    </div>
  )
}

export default InspectModal;
