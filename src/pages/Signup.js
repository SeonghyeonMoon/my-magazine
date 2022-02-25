import axios from 'axios';
import Input from '../elements/Input';
import styled from 'styled-components';
import Button from '../elements/Button';
import { useState } from 'react';

const Register = () => {
	const [inputs, setInputs] = useState({
		id: '',
		profile_img_url: 'aa',
		nickname: '',
		password: '',
		confirmPassword: '',
	});

	const onChange = e => {
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};

	const register = () => {
		// 예외 처리 추가
		console.log(inputs);
		axios.post('http://52.78.200.34/api/register', inputs).then(res => {
			console.log(res.data);
		});
	};

	return (
		<Container>
			<PageTitle>Register</PageTitle>
			<Input type='text' name='id' label='이메일' _onChange={onChange} />
			<Input
				type='text'
				name='profile_img_url'
				label='프로필 이미지 선택'
				_onChange={onChange}
			/>
			<Input type='text' name='nickname' label='닉네임' _onChange={onChange} />
			<Input
				type='text'
				name='password'
				label='비밀번호'
				_onChange={onChange}
			/>
			<Input
				type='text'
				name='confirmPassword'
				label='비밀번호 확인'
				_onChange={onChange}
			/>
			<Button _onClick={register}>회원가입</Button>
		</Container>
	);
};

export default Register;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: calc(90vh - 60px);
	h2,
	input {
		margin-bottom: 50px;
	}
`;

const PageTitle = styled.h2`
	color: #999;
	font-size: 50px;
`;
