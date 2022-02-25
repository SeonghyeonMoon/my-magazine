import { Route, Routes } from 'react-router-dom';
import PostList from './pages/PostList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WritePost from './pages/WritePost';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './store/modules/user';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

function App() {
	const dispatch = useDispatch();
	const isToken = localStorage.getItem('token') ? true : false;
	useEffect(() => {
    console.log('isToken', isToken)
	  if (isToken) {
	    dispatch(loadUser());
	  }
	}, [dispatch, isToken]);

	return (
		<>
			<GlobalStyle />
			<Header />
			<Routes>
				<Route path='/' element={<PostList />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/write' element={<WritePost />} />
			</Routes>
		</>
	);
}

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    height: 100%;
    /* background-color: #eee; */
		box-sizing: border-box;
  }
`;

export default App;
