import axios from 'axios';

// 민수님
// baseURL: "http://onlyonep.shop",

// 승민님
// baseURL: "http://52.78.200.34",

// 정용님
// baseURL: "http://xpecter.shop",

const api = axios.create({
	baseURL: 'http://52.78.200.34',
	headers: {
		'content-type': 'application/json;charset=UTF-8',
		Accept: 'application/json',
	},
});

api.interceptors.request.use(config => {
	const token = sessionStorage.getItem('token');
	if (token) {
		config.headers.common['token'] = token;
	}
	return config;
});

export const apis = {
	// post
	posts: () => api.get('/api/post?lastpost=0&number=3'),
	moreposts: postId => api.get(`/api/post?lastpost=${postId}&number=3`),
	post: postId => api.get(`/api/post/${postId}`),
	write: data => api.post('/api/post', data),
	delete: postId => api.delete(`/api/post/${postId}`),
	edit: (postId, contents, imgUrl) =>
		api.put(`/api/post/${postId}`, { contents, imgUrl }),

	// like
	likeUp: postId => api.post(`/api/post/${postId}/like`),
	likeDown: postId => api.delete(`/api/post/${postId}/like`),

	// user
	signup: userData => api.post('/api/register', userData),
	login: userData => api.post('/api/login', userData),
	me: () => api.get('/api/me'),
};
