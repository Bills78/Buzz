import { Alert } from 'react-bootstrap';

const ErrAlert = props => {
	const { showErr, errMsg } = props;

	return (
		<Alert show={showErr} variant='danger'>
			{errMsg}
		</Alert>
	);
};

export default ErrAlert;
