import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadPostDB = createAsyncThunk('post/load', async (_, thunkAPI) => {
	try {
		const token = localStorage.getItem('token');
		const response = await axios.get('http://52.78.200.34/api/post', {
			headers: { token },
		});
    return response.data.post
	} catch (err) {
		alert(err);
		return thunkAPI.rejectWithValue(err.response.message);
	}
});

export const writePostDB = createAsyncThunk(
	'post/write',
	async (_, thunkAPI) => {
		try {
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
			const token = localStorage.getItem('token');
			const response = await axios.delete(
				`http://52.78.200.34/api/post/${id}`,
				{
					headers: { token },
				}
			);
			console.log(response);
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
		post: [],
	},
	extraReducers: {
		[loadPostDB.pending]: (state, action) => {
			state.isLoading = true;
		},
		[loadPostDB.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload
		},
		[loadPostDB.rejected]: (state, action) => {
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
		},
		[deletePostDB.rejected]: (state, action) => {
			state.isLoading = false;
		},
	},
});

export default post.reducer;
