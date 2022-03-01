import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deletePostDB, likeDownDB, likeUpDB } from '../store/modules/post';
import { Heart } from '@styled-icons/bootstrap/Heart';
import { HeartFill } from '@styled-icons/bootstrap/HeartFill';
import { useNavigate } from 'react-router-dom';

const Post = props => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const likeUp = () => {
		dispatch(likeUpDB(props.id));
	};

	const likeDown = () => {
		dispatch(likeDownDB(props.id));
	};

	const deletePost = () => {
		dispatch(deletePostDB(props.id));
	};

	const toDetail = () => {
		navigate('/detail', {state: props})
	}

	console.log(props);
	return (
		<Card>
			<CardHeader>
				<ProfileImage src={props.profile_img_url} />
				<Nickname>{props.nickname}</Nickname>
				{props.byMe ? (
					<>
						<Button onClick={deletePost}>삭제</Button>
					</>
				) : (
					''
				)}
			</CardHeader>

			<CardBody>
				<CardContent type={props.type}>{props.content}</CardContent>
				<CardImage src={props.img_url} onClick={() => {toDetail(props.id)}}/>
			</CardBody>
			<CardFooter>
				{props.like_check ? (
					<DisLikeButton onClick={likeDown}>좋아요취소</DisLikeButton>
				) : (
					<LikeButton onClick={likeUp}>좋아요</LikeButton>
				)}
				<LikeComment>{props.like_count}명이 좋아합니다</LikeComment>
			</CardFooter>
		</Card>
	);
};

export default Post;

const Card = styled.div`
	border: 1px solid #ccc;
	border-radius: 10px;
	width: 500px;
	margin: 30px auto;
	background-color: #fff;
	box-shadow: 10px 10px 10px #ccc;
`;

const CardHeader = styled.div`
	border-bottom: 1px solid #ccc;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	display: flex;
	align-items: center;
	height: 50px;
`;

const Button = styled.button`
	border: none;
	margin-left: auto;
	margin-right: 30px;
	background: none;
	color: #888;
	cursor: pointer;
`;

const ProfileImage = styled.div`
	width: 35px;
	height: 35px;
	border-radius: 10px;
	margin: 0 15px;
	border: 1px solid #ccc;
	${props => (props.src ? `background-image: url(${props.src})` : '')};
	background-position: center;
	background-size: cover;
`;

const Nickname = styled.p`
	font-size: 14px;
	color: #777;
`;

const CardBody = styled.div`
	align-items: center;
	justify-content: space-between;
	position: relative;
`;

const CardImage = styled.img`
	width: 100%;
`;

const CardContent = styled.p`
	${props =>
		props.type === 1
			? 'top: 10%; left: 60%;'
			: 'writing-mode: vertical-rl; text-orientation: upright; top: 50%;'};
	position: absolute;
	${props => (props.type === 2 ? 'left: 10%;' : 'right: 10%;')}
	transform: translateY(-50%);
	left: 50px;
	color: #fff;
	font-size: 16px;
	font-weight: bold;
	padding: 10px;
	display: inline;
`;

const CardFooter = styled.div``;

const LikeButton = styled(Heart)`
	margin: 10px 0 10px 10px;
	width: 25px;
`;

const DisLikeButton = styled(HeartFill)`
	margin: 10px 0 10px 10px;
	width: 25px;
`;

const LikeComment = styled.p`
	margin: 0 0 10px 10px;
`;
