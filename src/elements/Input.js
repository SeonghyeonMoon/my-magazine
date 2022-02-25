import styled from 'styled-components';

const Input = props => {
	return (
		<Container>
			{props.label ? <StyledLabel>{props.label}</StyledLabel> : null}
			<StyledInput name={props.name} onChange={props._onChange} />
		</Container>
	);
};

export default Input;

const Container = styled.div`
	position: relative;
`;

const StyledInput = styled.input`
	width: 300px;
	line-height: 45px;
	border: 2px solid #999;
	border-radius: 5px;
	transition: 0.2s;
	text-align: center;
	color: #999;
	font-size: 15px;
	// 마진 방법 수정
	margin-top: 10px;
	&:focus {
		border-color: #777;
		color: #777;
		outline: none;
	}
`;

const StyledLabel = styled.p`
	font-size: 15px;
	font-weight: bold;
	color: #999;
`;
