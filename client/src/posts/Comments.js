import { Card, Button } from 'react-bootstrap';
import uniqid from 'uniqid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as darkThumb } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as lightThumb } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const Comments = props => {
	const { postId, comments, setPost, token, liked } = props;

	const addLike = async (commentId, commentLikes) => {
		const newLikes = commentLikes + 1;
		await axios.all([
			axios
				.patch(
					'/add-comment-like',
					{ likes: newLikes },
					{
						params: {
							commentId,
						},
						headers: {
							'x-access-token': `${token}`,
						},
					}
				)
				.then(() => {
					setPost({
						id: '',
					});
				}),
			axios.patch(
				'/add-comment-liked',
				{ commentId },
				{
					headers: {
						'x-access-token': `${token}`,
					},
				}
			),
		]);
	};

	const removeLike = async (commentId, commentLikes) => {
		setPost({
			id: '',
		});
		const newLikes = commentLikes - 1;
		await axios.all([
			axios
				.patch(
					'/add-comment-like',
					{ likes: newLikes },
					{
						params: {
							commentId,
						},
						headers: {
							'x-access-token': `${token}`,
						},
					}
				)
				.then(res => {
					setPost({
						id: '',
					});
				}),
			axios.patch(
				'/remove-comment-liked',
				{ commentId },
				{
					headers: {
						'x-access-token': `${token}`,
					},
				}
			),
		]);
	};

	const likeReq = async (commentId, commentLikes) => {
		setPost({
			id: 1,
		});
		await axios
			.get(`/check-comment-likes/:${commentId}`, {
				params: {
					commentId,
				},
				headers: {
					'x-access-token': `${token}`,
				},
			})
			.then(res => {
				const data = res.data.data;
				if (data === true) {
					return removeLike(commentId, commentLikes);
				} else if (data === false) {
					return addLike(commentId, commentLikes);
				}
			});
	};

	const matchedComments = comments
		.filter(comment => comment.mainPost === postId)
		.reverse();

	return (
		<>
			{matchedComments.map(comment => {
				let isLiked = liked.includes(comment._id);
				const ThumbThumb = () => {
					if (isLiked) {
						return <FontAwesomeIcon icon={darkThumb} />;
					}
					return <FontAwesomeIcon icon={lightThumb} />;
				};
				return (
					<div key={uniqid()}>
						<Card className='comment'>
							<Card.Body className='comment-body'>
								<Card.Text className='comment-header'>
									<small className='text-muted'>@{comment.postedBy}</small>{' '}
									<small className='text-muted'>Likes: {comment.likes}</small>
								</Card.Text>
								<Card.Text className='comment-body'>{comment.body}</Card.Text>
								<Card.Text>
									<Button
										className='need-it-smaller'
										onClick={() => {
											isLiked ? (isLiked = false) : (isLiked = true);
											likeReq(comment._id, comment.likes);
										}}
										size='sm'
										variant='warning'>
										<ThumbThumb />
									</Button>
								</Card.Text>
							</Card.Body>
						</Card>
					</div>
				);
			})}
		</>
	);
};

export default Comments;
