import axios from 'axios';

const baseUrl = 'http://localhost:8000/';
export const register = userData => {
	return axios
		.post(baseUrl+'api/register', userData, {
			headers: { 'Content-Type': 'application/json' }
		})
		.then( res => {
			console.log(res)
			return res;
		})
		.catch( err => {
			return err.response.data;
			console.log(err);
		});
}

export const login = user  => {
	return axios
		.post(baseUrl+'api/login', user , {
			headers: { 'Content-Type': 'application/json' }
		})
		.then( res => {
			localStorage.setItem('userToken', res.data.token);
			localStorage.setItem('userID', res.data.user.id);
			localStorage.setItem('userType', res.data.user.access_type);
			return res;
		})
		.catch( err => {
			return err.response.data;
			console.log(err);
		});
}

export const getProfile = (id) => {
	return axios
		// .get(baseUrl+'api/profile', {
		// 	headers: { Authorization: `Bearer $(localStorage.userToken)` }
		// })
		.get(baseUrl+'api/profile/'+id, {
			headers: { Authorization: `Bearer $(localStorage.userToken)` }
		})
		.then( res => {
			return res.data;
		})
		.catch( err => {
			return err.response.data;
			console.log(err);
		});
}

export const getUsers = () => {
	return axios
		.get(baseUrl+'api/all-users', {
			headers: { Authorization: `Bearer $(localStorage.userToken)` }
		})
		.then( res => {
			return res.data;
		})
		.catch( err => {
			return err.response.data;
			console.log(err);
		});
}

export const updateUser = userData => {
	return axios
		.post(baseUrl+'api/update-user', userData, {
			headers: { 'Content-Type': 'application/json' }
		})
		.then( res => {
			return res;
		})
		.catch( err => {
			return err.response.data;
			console.log(err);
		});
}

export const deleteUser = (id) => {
	return axios
		.get(baseUrl+'api/delete-user/'+id, {
			headers: { Authorization: `Bearer $(localStorage.userToken)` }
		})
		.then( res => {
			return res;
		})
		.catch( err => {
			return err.response.data;
			console.log(err);
		});
}