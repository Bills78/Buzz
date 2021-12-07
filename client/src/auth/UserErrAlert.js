import { Alert } from "react-bootstrap"


const UserErrAlert = (props) => {

  const { showUserErr, errMsg } = props;

  return (
    <Alert show={showUserErr} variant="danger">
      {errMsg}
    </Alert>
  )
}

export default UserErrAlert;