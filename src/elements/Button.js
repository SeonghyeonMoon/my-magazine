import styled from 'styled-components';

const Button = props => {
	return <StyledButton {...props} onClick={props._onClick}>{props.children}</StyledButton>;
};

const StyledButton = styled.button`
	width: ${props => (props.fullwidth ? '300px' : '100px')};
	height: 50px;
	border: none;
	border-radius: 5px;
	color: #fff;
	background-color: #999;
	font-size: 18px;
	cursor: pointer;
	transition: .2s;
	&:hover {
		background-color: #bbb;
	}
	&:active {
		background-color: #777;
	}
`;

export default Button;
