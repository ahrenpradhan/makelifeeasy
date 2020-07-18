import axios from 'axios';

let userRoutes = {
	signIn: function (obj) {
		return axios
			.get(' http://localhost:5000/users/find', {
				params: obj,
			})
			.then((response) => {
				console.log(response);
				console.log('access ' + response.data.access);
				return response.data;
			})
			.catch((error) => {
				console.error(error);
			});
	},
	signUp: function (obj) {
		return axios
			.post('http://localhost:5000/users/add', {
				firstName: obj.firstName || '',
				lastName: obj.lastName || '',
				username: obj.username || '',
				emails: [obj.email || ''],
				password: obj.password || '',
			})
			.then((response) => {
				console.log(response);
				console.log('access' + response.data.access);
				return response.data;
			})
			.catch((error) => {
				console.error(error);
			});
	},
};

export default userRoutes;
