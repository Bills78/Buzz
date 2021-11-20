import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import uniqid from 'uniqid';

const InspectModal = (props) => {

  const { username, onHide, single, handleDelete, ...rest } = props;

  const LeButton = (props) => {
    return (
      <Button variant='dark' onClick={() => {
        handleDelete(props.postId);
        onHide();
      }}>Delete</Button>
    )
  };

  const NotLeButton = (props) => {
    return null
  }

  const IsUser = (props) => {
    if (props.username === props.postUser) {
      return <LeButton />
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
            >
              <Modal.Body>
                <p>{`${post.body}`}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='warning' onClick={onHide}>Close</Button>
                <IsUser 
                  username={username}
                  postUser={post.username}
                />
                {/* <Button variant='dark' onClick={() => {
                  handleDelete(post._id);
                  onHide();
                }}>Delete</Button> */}
              </Modal.Footer>
            </Modal>
          </div>
        })
      }
    </div>
  )
}

export default InspectModal;
