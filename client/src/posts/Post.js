import moment from 'moment';
import axios from 'axios';
import { Card, Container, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as darkThumb } from '@fortawesome/free-solid-svg-icons';
import {
	faThumbsUp as lightThumb,
	faComment,
	faEdit,
} from '@fortawesome/free-regular-svg-icons';
import Comments from './Comments';
import { useState } from 'react';

const Post = props => {
	const {
		posts,
		username,
		setShowEdit,
		setPost,
		sendLikes,
		comments,
		token,
		liked,
	} = props;

	const [commentClicked, setCommentClicked] = useState([]);
	const [commentValue, setCommentValue] = useState('');

	const Buttons = props => {
		if (username === props.postUser) {
			return (
				<>
					<Button
						className='post-btn'
						size='sm'
						variant='warning'
						onClick={() => {
							setShowEdit(true);
							setPost({
								body: props.postBody,
								id: props.postId,
							});
						}}>
						<FontAwesomeIcon icon={faEdit} />
					</Button>{' '}
				</>
			);
		}
		return null;
	};

	const ThumbThumb = props => {
		if (props.isLiked) {
			return <FontAwesomeIcon icon={darkThumb} />;
		}
		return <FontAwesomeIcon icon={lightThumb} />;
	};

	const submitComment = async postId => {
		console.log(postId);
		await axios
			.post(
				'/create-comment',
				{
					mainPost: postId,
					body: commentValue,
				},
				{
					headers: {
						'x-access-token': `${token}`,
					},
				}
			)
			.then(res => {
				setCommentValue('');
			});
	};

	return (
		<Container className='Posts' fluid>
			{posts.map((post, i) => {
				const createdAt = moment(post.createdAt).startOf('second').fromNow();
				let isLiked = liked.includes(post._id);

				return (
					<div key={post._id}>
						<Card className='post'>
							<Card.Body className='post-body'>
								<Card.Text className='post-header'>
									<small className='text-muted'>@{post.postedBy}</small>{' '}
									<small>Likes: {post.likes}</small>{' '}
									<small className='text-muted'>{createdAt}</small>
								</Card.Text>
								<Card.Text className='post-text'>{post.body}</Card.Text>
								<Card.Text className='bottom-post-btns text-muted'>
									<Button
										onClick={() => {
											isLiked ? (isLiked = false) : (isLiked = true);
											sendLikes(post._id, post.likes);
										}}
										size='sm'
										variant='warning'
										className='post-btn'>
										<ThumbThumb isLiked={isLiked} />
									</Button>
									<Button
										onClick={() => {
											if (commentClicked.includes(post._id)) {
												const filtered = commentClicked.filter(
													id => id !== post._id
												);
												setCommentClicked(filtered);
											} else {
												return setCommentClicked([post._id]);
											}
										}}
										size='sm'
										variant='warning'
										className='post-btn'>
										<FontAwesomeIcon icon={faComment} />
									</Button>
									<Buttons
										postUser={post.postedBy}
										postId={post._id}
										postBody={post.body}
									/>
								</Card.Text>
								{commentClicked.includes(post._id) ? (
									<Form
										className='comment-form'
										onSubmit={() => submitComment(post._id)}
										key={props.postId}>
										<Form.Group>
											<Form.Control
												className='comment-text-area'
												as='textarea'
												rows={1}
												placeholder='leave a comment...'
												defaultValue={commentValue}
												onChange={e => {
													setCommentValue(e.target.value);
												}}
											/>
										</Form.Group>
										<Button
											className='comment-submit'
											size='sm'
											variant='warning'
											type='submit'>
											submit
										</Button>
									</Form>
								) : null}
								{liked && (
									<Comments
										postId={post._id}
										comments={comments}
										setPost={setPost}
										token={token}
										liked={liked}
									/>
								)}
							</Card.Body>
						</Card>
					</div>
				);
			})}
		</Container>
	);
};

export default Post;
