import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/modules/user';
import { loadPostsDB } from '../store/modules/post';
import styled from 'styled-components';

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(state => state.user);
	const toMain = () => {
		navigate('/');
	};

	const toLogin = () => {
		navigate('./login');
	};

	const logout = () => {
		dispatch(logoutUser())
			.then(() => dispatch(loadPostsDB()))
			.then(() => navigate('/'));
	};

	return (
		<Container>
			<Logo onClick={toMain}>𝑱𝒖𝒈𝒖𝒆𝒕𝒆𝒓í𝒂</Logo>
			{user.isLogin ? (
				<Button onClick={logout}>Logout</Button>
			) : (
				<Button onClick={toLogin}>로그인</Button>
			)}
		</Container>
	);
};

export default Header;

const Container = styled.div`
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 160px;
	background-color: #fff;
	border-bottom: 1px solid #ccc;
	box-shadow: 10px 10px 10px #ccc;
`;

const Logo = styled.h1`
	font-size: 25px;
	font-weight: bold;
	transition: 0.1s;
	color: #555;
	cursor: pointer;
	&:hover {
		color: #888;
	}
`;

const Button = styled.button`
	margin-top: 5px;
	border: none;
	background: none;
	font-size: 15px;
	font-weight: 600;
	color: #ccc;
	transition: 0.1s;
	cursor: pointer;
	&:hover {
		color: #555;
	}
`;
