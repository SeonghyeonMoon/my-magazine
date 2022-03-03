import { useCallback, useEffect, useRef } from 'react';
import Post from '../components/Post';
import { useSelector, useDispatch } from 'react-redux';
import { loadPostsDB, loadMorePostsDB } from '../store/modules/post';
import styled from 'styled-components';

const PostList = () => {
	const dispatch = useDispatch();
	const postsData = useSelector(state => state.post);
	useEffect(() => {
		dispatch(loadPostsDB());
	}, [dispatch]);

	const nextPage = useCallback(() => {
		// state에 글이 하나도 없을 때 예외처리 추가 필요
		dispatch(loadMorePostsDB(postsData.posts[postsData.posts.length - 1].id));
	}, [dispatch, postsData.posts]);

	const lastBox = useRef(null);
	console.log(postsData);

	useEffect(() => {
		const handleIntersection = entries => {
			if (entries[0].isIntersecting) {
				nextPage();
			}
		};
		const observer = new IntersectionObserver(handleIntersection);
		if (lastBox.current) {
			observer.observe(lastBox.current);
		}
		return () => observer.disconnect();
	}, [nextPage]);

	return (
		<Container>
			{postsData.posts &&
				postsData.posts.map(post => <Post {...post} key={post.id} />)}
			{postsData.isLast ? null : <LoadBox ref={lastBox} />}
		</Container>
	);
};

export default PostList;

const Container = styled.div`
	padding: 30px
`

const LoadBox = styled.div`
	width: 100%;
	height: 10px;
`;
