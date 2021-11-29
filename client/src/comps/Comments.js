import { Card, Form } from "react-bootstrap";

const Comments = (props) => {

  const { commentShow } = props;

  if (commentShow) {
    return (
      <Form>
        <Card.Footer>
          <input></input>
        </Card.Footer>
      </Form>
    )
  }
  return null

}

export default Comments;