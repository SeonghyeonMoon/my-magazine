import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/modules/user';
import styled from 'styled-components';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [inputs, setInputs] = useState({
		id: '',
		password: '',
	});

	const onChange = e => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const login = () => {
		// 예외 처리 추가
		dispatch(loginUser(inputs)).then(() => {
			navigate('/');
		});
	};

	return (
		<Container>
			<PageTitle>Login</PageTitle>
			<Input
				type='text'
				name='id'
				placeholder='이메일을 입력해 주세요'
				onChange={onChange}
			/>
			<Input
				type='password'
				name='password'
				placeholder='비밀번호를 입력해 주세요'
				onChange={onChange}
			/>
			<ButtonGroup>
				<Button onClick={login}>Login</Button>
				<Button
					onClick={() => {
						navigate('/signup');
					}}
				>
					Signup
				</Button>
			</ButtonGroup>
		</Container>
	);
};

export default Login;

const Container = styled.div`
	padding: 50px 0;
	width: 500px;
	height: 300px;
	background-color: #fff;
	margin: 100px auto;
	border: 1px solid #ccc;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	box-shadow: 10px 10px 10px #ccc;
`;

const PageTitle = styled.h2`
	font-size: 30px;
	text-align: center;
	color: #777;
`;

const Input = styled.input`
	display: block;
	border: 2px solid #ccc;
	border-radius: 3px;
	width: 80%;
	height: 50px;
	text-align: center;
	background-color: #eee;
	outline: none;
	font-size: 15px;
	color: #444;
`;

const ButtonGroup = styled.div`
	width: 80%;
	display: flex;
	justify-content: space-between;
`;

const Button = styled.button`
	width: 48%;
	height: 50px;
	color: #fff;
	border: none;
	background-color: #777;
	border-radius: 5px;
	font-size: 15px;
	box-shadow: 5px 5px 5px #ccc;
	transition: 0.1s;
	cursor: pointer;
	&:hover {
		background-color: #aaa;
	}
	&:active {
		background-color: #555;
	}
`;
