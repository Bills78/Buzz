import NewUser from '../auth/NewUser';
import Login from '../auth/Login';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrAlert from '../auth/ErrAlert';
import UserErrAlert from '../auth/UserErrAlert';

axios.defaults.baseURL = 'http://localhost:8080';

const Start = () => {
	let navigate = useNavigate();

	const [errMsg, setErrMsg] = useState(null);
	const [showErr, setShowErr] = useState(false);
	const [showUserErr, setShowUserErr] = useState(false);
	const [newUser, setNewUser] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [loginUser, setLoginUser] = useState({
		username: '',
		password: '',
	});

	const handleNewChange = e =>
		setNewUser({
			...newUser,
			[e.target.name]: e.target.value,
		});

	const handleLoginChange = e =>
		setLoginUser({
			...loginUser,
			[e.target.name]: e.target.value,
		});

	const onNewSubmit = async e => {
		e.preventDefault();
		await axios
			.post('/new-user', { ...newUser })
			.then(res => {
				localStorage.setItem('user', res.data.token);
				navigate('/home');
			})
			.catch(err => {
				setErrMsg(err.response.data.message);
				setShowUserErr(true);
				setShowErr(false);
			});
	};

	const onLoginSubmit = async e => {
		e.preventDefault();
		await axios
			.post('/log-in', { ...loginUser })
			.then(res => {
				localStorage.setItem('user', res.data.token);
				navigate('/home');
			})
			.catch(err => {
				setErrMsg(err.response.data.message);
				setShowErr(true);
				setShowUserErr(false);
			});
	};

	return (
		<Container>
			<Card bg='warning' className='login-interface'>
				<Card.Header>Welcome to Buzz</Card.Header>
				<Card.Body>
					<UserErrAlert errMsg={errMsg} showUserErr={showUserErr} />
					<Container>
						<NewUser
							handleNewChange={handleNewChange}
							onNewSubmit={onNewSubmit}
						/>
					</Container>
					<div className='or-lines'>
						<div className='or-line'></div>
						<div className='the-or'>
							<p>or</p>
						</div>
						<div className='or-line'></div>
					</div>
					<ErrAlert errMsg={errMsg} showErr={showErr} />
					<Login
						handleLoginChange={handleLoginChange}
						onLoginSubmit={onLoginSubmit}
					/>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default Start;
