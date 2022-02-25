import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
const Header = () => {
	const navigate = useNavigate();
	const toMain = () => {
		navigate('/');
	};

	const toLogin = () => {
		navigate('./login');
	};

	const logout = () => {
		localStorage.removeItem('token');
	};

	return (
		<div>
			<h1 onClick={toMain}>Header</h1>
			<button onClick={toLogin}>Login</button>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default Header;
