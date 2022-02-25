import { useEffect } from 'react';
import Post from '../components/Post';
import { useSelector, useDispatch } from 'react-redux';
import { loadPostDB } from '../store/modules/post';

const PostList = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const post = useSelector(state => state.post);
  // 의존성 어디 해야할지 질문
	useEffect(() => {
		dispatch(loadPostDB());
	}, [dispatch, user, post]);

	return (
		<>
			{post.post.map((data, index) => (
				<Post {...data} key={index} />
			))}
		</>
	);
};

export default PostList;
