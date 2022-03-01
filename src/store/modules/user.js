import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apis } from '../../api';

export const signupUserDB = createAsyncThunk(
	'user/signup',
	async (data, thunkAPI) => {
		try {
			console.log(data);
			await apis.signup(data);
			return;
		} catch (err) {
			alert(err);
			return thunkAPI.rejectWithValue(err.response.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	'user/login',
	async (loginData, thunkAPI) => {
		try {
			const response = await apis.login(loginData);
			sessionStorage.setItem('token', response.data.token);
			return true;
		} catch (err) {
			alert(err);
			return thunkAPI.rejectWithValue(err.response.message);
		}
	}
);

// 동기 함수로 변경
export const logoutUser = createAsyncThunk(
	'user/logout',
	async (_, thunkAPI) => {
		try {
			sessionStorage.removeItem('token');
			return;
		} catch (err) {
			alert(err);
			return thunkAPI.rejectWithValue(err.response.message);
		}
	}
);

export const loadUser = createAsyncThunk('user/load', async (_, thunkAPI) => {
	try {
		const response = await apis.me();
		const userData = {
			id: response.data.id,
			nickname: response.data.nickname,
			profile_img_url: response.data.profile_img_url,
		};
		return userData;
	} catch (err) {
		console.log(err);
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
		[signupUserDB.pending]: (state, action) => {
			state.isLoading = true;
		},
		[signupUserDB.fulfilled]: (state, action) => {
			state.isLoading = false;
		},
		[signupUserDB.rejected]: (state, action) => {
			state.isLoading = false;
		},
		[loginUser.pending]: (state, action) => {
			state.isLoading = true;
		},
		[loginUser.fulfilled]: (state, action) => {
			state.isLoading = false;
		},
		[loginUser.rejected]: (state, action) => {
			state.isLoading = false;
		},
		[logoutUser.pending]: (state, action) => {
			state.isLoading = true;
		},
		[logoutUser.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isLogin = false;
			state.nickname = '';
			state.profileUrl = '';
		},
		[logoutUser.rejected]: (state, action) => {
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
