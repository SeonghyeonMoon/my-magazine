import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apis } from '../../api';

export const loadPostsDB = createAsyncThunk(
	'post/load',
	async (_, thunkAPI) => {
		try {
			const response = await apis.posts();
			return response.data.posts;
		} catch (err) {
			alert(err);
			return thunkAPI.rejectWithValue(err.response.message);
		}
	}
);

export const loadMorePostsDB = createAsyncThunk(
	'post/moreload',
	async (id, thunkAPI) => {
		try {
			const response = await apis.moreposts(id);
			return response.data;
		} catch (err) {
			alert(err);
			return thunkAPI.rejectWithValue(err.response.message);
		}
	}
);

export const loadDetailPostDB = createAsyncThunk(
	'post/oneload',
	async (id, thunkAPI) => {
		try {
			const response = await apis.post(id);
			console.log(response);
		} catch (err) {
			alert(err);
			return thunkAPI.rejectWithValue(err.response.message);
		}
	}
);

export const writePostDB = createAsyncThunk(
	'post/write',
	async (data, thunkAPI) => {
		try {
			if (!('img_url' in data)) {
				data.img_url =
					'https://mblogthumb-phinf.pstatic.net/MjAxODAzMDNfMTc5/MDAxNTIwMDQxNzQwODYx.qQDg_PbRHclce0n3s-2DRePFQggeU6_0bEnxV8OY1yQg.4EZpKfKEOyW_PXOVvy7wloTrIUzb71HP8N2y-YFsBJcg.PNG.osy2201/1_%2835%ED%8D%BC%EC%84%BC%ED%8A%B8_%ED%9A%8C%EC%83%89%29_%ED%9A%8C%EC%83%89_%EB%8B%A8%EC%83%89_%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4_180303.png?type=w800';
			}
			console.log('write', data);
			const response = await apis.write(data);
			console.log(response);
		} catch (err) {
			alert(err);
			return thunkAPI.rejectWithValue(err.response.message);
		}
	}
);

export const updatePostDB = createAsyncThunk(
	'post/update',
	async (_, thunkAPI) => {
		try {
			// 미구현
		} catch (err) {
			alert(err);
			return thunkAPI.rejectWithValue(err.response.message);
		}
	}
);

export const deletePostDB = createAsyncThunk(
	'post/update',
	async (id, thunkAPI) => {
		try {
			const token = sessionStorage.getItem('token');
			await axios.delete(`http://52.78.200.34/api/post/${id}`, {
				headers: { token },
			});
			thunkAPI.dispatch(loadPostsDB);
			return id;
		} catch (err) {
			alert(err);
			return thunkAPI.rejectWithValue(err.response.message);
		}
	}
);

export const likeUpDB = createAsyncThunk(
	'post/likeupDB',
	async (id, thunkAPI) => {
		try {
			const response = await apis.likeUp(id);
			console.log('좋아요 확인', response);
			return id;
		} catch (err) {
			alert(err);
			return thunkAPI.rejectWithValue(err.response.message);
		}
	}
);

export const likeDownDB = createAsyncThunk(
	'post/likedownDB',
	async (id, thunkAPI) => {
		try {
			const response = await apis.likeDown(id);
			console.log(response);
			return id;
		} catch (err) {
			alert(err);
			return thunkAPI.rejectWithValue(err.response.message);
		}
	}
);

const post = createSlice({
	name: 'postReducer',
	initialState: {
		isLoading: false,
		posts: [],
		isLast: false,
	},
	extraReducers: {
		[loadPostsDB.pending]: (state, action) => {
			state.isLoading = true;
		},
		[loadPostsDB.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.posts = action.payload;
			console.log(state.posts);
		},
		[loadPostsDB.rejected]: (state, action) => {
			state.isLoading = false;
		},
		[loadMorePostsDB.pending]: (state, action) => {
			state.isLoading = true;
		},
		[loadMorePostsDB.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.posts = state.posts.concat(action.payload.posts);
			state.isLast = action.payload.isLast;
		},
		[loadMorePostsDB.rejected]: (state, action) => {
			state.isLoading = false;
		},
		[writePostDB.pending]: (state, action) => {
			state.isLoading = true;
		},
		[writePostDB.fulfilled]: (state, action) => {
			state.isLoading = false;
		},
		[writePostDB.rejected]: (state, action) => {
			state.isLoading = false;
		},
		[updatePostDB.pending]: (state, action) => {
			state.isLoading = true;
		},
		[updatePostDB.fulfilled]: (state, action) => {
			state.isLoading = false;
		},
		[updatePostDB.rejected]: (state, action) => {
			state.isLoading = false;
		},
		[deletePostDB.pending]: (state, action) => {
			state.isLoading = true;
		},
		[deletePostDB.fulfilled]: (state, action) => {
			state.isLoading = false;
			const index = state.posts.findIndex(post => post.id === action.payload);
			state.posts.splice(index, 1);
		},
		[deletePostDB.rejected]: (state, action) => {
			state.isLoading = false;
		},
		[likeUpDB.pending]: (state, action) => {
			state.isLoading = true;
		},
		[likeUpDB.fulfilled]: (state, action) => {
			state.isLoading = false;
			const index = state.posts.findIndex(post => post.id === action.payload);
			state.posts[index].like_count += 1;
			state.posts[index].like_check = true;
		},
		[likeUpDB.rejected]: (state, action) => {
			state.isLoading = false;
		},
		[likeDownDB.pending]: (state, action) => {
			state.isLoading = true;
		},
		[likeDownDB.fulfilled]: (state, action) => {
			state.isLoading = false;
			const index = state.posts.findIndex(post => post.id === action.payload);
			state.posts[index].like_count -= 1;
			state.posts[index].like_check = false;
		},
		[likeDownDB.rejected]: (state, action) => {
			state.isLoading = false;
		},
	},
});

export default post.reducer;
