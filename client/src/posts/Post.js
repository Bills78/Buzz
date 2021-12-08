import moment from 'moment';
import { useState } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import uniqid from 'uniqid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as darkThumb } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as lightThumb } from '@fortawesome/free-regular-svg-icons';

const Post = props => {
	const { posts, username, setShowEdit, setPost, sendLikes, comments } = props;
	const { funcShow, setFuncShow } = useState(false);

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
						Edit
					</Button>{' '}
				</>
			);
		}
		return null;
	};

	const CommentFunc = () => {
		if (funcShow) {
			return <input></input>;
		}
	};

	const Comments = props => {
		const { postId } = props;
		const matchedComments = comments.filter(
			comment => comment.mainPost === postId
		);

		return (
			<>
				{matchedComments.map(comment => {
					return (
						<div key={uniqid()}>
							<Card className='comment'>
								<Card.Body className='comment-body'>
									<Card.Text className='comment-header'>
										<small className='text-muted'>@{comment.postedBy}</small>{' '}
									</Card.Text>
									<Card.Text className='comment-body'>{comment.body}</Card.Text>
									<Card.Text>
										<Button
											className='need-it-smaller'
											onClick={() => {
												console.log('comment like clicked');
											}}
											size='sm'
											variant='warning'>
											<FontAwesomeIcon icon={lightThumb}></FontAwesomeIcon>
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

	return (
		<Container className='Posts' fluid>
			{posts.map(post => {
				const createdAt = moment(post.createdAt).startOf('second').fromNow();
				return (
					<div key={post._id}>
						<Card className='post'>
							<Card.Body>
								<Card.Text className='post-header'>
									<small className='text-muted'>@{post.postedBy}</small>{' '}
									<small>Likes: {post.likes}</small>{' '}
									<small className='text-muted'>{createdAt}</small>
								</Card.Text>
								<Card.Text>{post.body}</Card.Text>
								<Card.Text className='bottom-post-btns text-muted'>
									<Button
										onClick={() => {
											sendLikes(undefined, 'post-likes', post._id, post.likes);
										}}
										size='sm'
										variant='warning'
										className='post-btn'>
										<FontAwesomeIcon icon={lightThumb}></FontAwesomeIcon>
									</Button>
									<Button
										onClick={() => {
											setFuncShow(true);
											console.log('comment clicked');
										}}
										size='sm'
										variant='warning'
										className='post-btn'>
										Comment
									</Button>
									<Buttons
										postUser={post.postedBy}
										postId={post._id}
										postBody={post.body}
									/>
								</Card.Text>
								<Comments postId={post._id} />
							</Card.Body>
						</Card>
					</div>
				);
			})}
		</Container>
	);
};

export default Post;
