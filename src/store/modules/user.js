import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
	'user/login',
	async (loginData, thunkAPI) => {
		try {
			const response = await axios.post('http://52.78.200.34/api/login', {
				id: loginData.id,
				password: loginData.password,
			});
			console.log('로그인', response);
			localStorage.setItem('token', response.data.token);
			return true;
		} catch (err) {
			alert(err);
			return thunkAPI.rejectWithValue(err.response.message);
		}
	}
);

export const loadUser = createAsyncThunk('user/load', async (_, thunkAPI) => {
	try {
		const token = localStorage.getItem('token');
		const response = await axios.get('http://52.78.200.34/api/me', {
			headers: { token },
		});
		console.log('정보 가져오기', response);
		const userData = {
			id: response.data.id,
			nickname: response.data.nickname,
			profile_img_url: response.data.profile_img_url,
		};
		return userData;
	} catch (err) {
		alert(err);
		return thunkAPI.rejectWithValue(err.response.message);
	}
});

const user = createSlice({
	name: 'userReducer',
	initialState: {
		isLogin: false,
		nickname: '',
		profileUrl: '',
	},
	extraReducers: {
		[loginUser.pending]: (state, action) => {
			state.isLoading = true;
		},
		[loginUser.fulfilled]: (state, action) => {
			state.isLoading = false;
		},
		[loginUser.rejected]: (state, action) => {
			state.isLoading = false;
		},
		[loadUser.pending]: (state, action) => {
			state.isLoading = true;
		},
		[loadUser.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isLogin = true;
			state.nickname = action.payload.nickname;
			state.profileUrl = action.payload.profile_img_url;
		},
		[loadUser.rejected]: (state, action) => {
			state.isLoading = false;
		},
	},
});

export default user.reducer;
