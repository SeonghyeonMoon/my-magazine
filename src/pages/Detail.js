import { useLocation } from 'react-router-dom';

const Detail = props => {
	const locationState = useLocation().state;
	return (
		<>
			<h1>프로필 이미지 - {locationState.profile_img_url}</h1>
			<h1>프로필 닉네임 - {locationState.nickname}</h1>
			<h1>내용 - {locationState.content}</h1>
			<img src={locationState.img_url} alt='이미지' />
		</>
	);
};
export default Detail;
