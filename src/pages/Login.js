import { useState } from 'react';
import Button from '../elements/Button';
import Input from '../elements/Input';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/modules/user';

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
		dispatch(loginUser(inputs));
		navigate('/');
	};

	return (
		<Container>
			<PageTitle>Login</PageTitle>
			<Input type='text' name='id' label='아이디' _onChange={onChange} />
			<Input
				type='password'
				name='password'
				label='비밀번호'
				_onChange={onChange}
			/>
			<Button _onClick={login}>Login</Button>
			<Button
				_onClick={() => {
					navigate('/signup');
				}}
			>
				Register
			</Button>
		</Container>
	);
};

export default Login;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: calc(90vh - 60px);
	h2,
	input {
		margin-bottom: 80px;
	}
`;

const PageTitle = styled.h2`
	color: #999;
	font-size: 50px;
`;
