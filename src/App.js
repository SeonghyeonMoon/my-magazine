import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy, Suspense } from 'react';
import { loadUser } from './store/modules/user';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import styled from 'styled-components';

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isToken = sessionStorage.getItem('token') ? true : false;
	const user = useSelector(state => state.user);

	useEffect(() => {
		console.log('isToken', isToken);
		if (isToken) {
			dispatch(loadUser());
		}
	}, [dispatch, isToken]);

	const toWrite = () => {
		navigate('/write');
	};

	const Header = lazy(() => import('./components/Header'));
	const PostList = lazy(() => import('./pages/PostList'));
	const Detail = lazy(() => import('./pages/Detail'));
	const Login = lazy(() => import('./pages/Login'));
	const Signup = lazy(() => import('./pages/Signup'));
	const WritePost = lazy(() => import('./pages/WritePost'));
	const UpdatePost = lazy(() => import('./pages/UpdatePost'));

	return (
		<>
			<Suspense fallback={<h1>Loading...</h1>}>
				<GlobalStyle />
				<Header />
				{user.isLogin ? <WriteButton onClick={toWrite}>+</WriteButton> : ''}
				<Routes>
					<Route path='/' element={<PostList />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/write' element={<WritePost />} />
					<Route path='/update' element={<UpdatePost />} />
					<Route path='/detail' element={<Detail />} />
				</Routes>
			</Suspense>
		</>
	);
}

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    height: 100%;
    background-color: #eee;
		box-sizing: border-box;
  }
`;

const WriteButton = styled.button`
	position: fixed;
	bottom: 100px;
	right: 100px;
	border-radius: 50%;
	width: 70px;
	height: 70px;
	border: none;
	background-color: #fff;
	box-shadow: 10px 10px 10px #ccc;
	font-size: 60px;
	color: #ccc;
	z-index: 999;
	&:hover {
		background-color: #eee;
		color: #fff;
	}
	&:active {
		background-color: #fff;
		color: #bbb;
		z-index: 999;
	}
`;

export default App;
