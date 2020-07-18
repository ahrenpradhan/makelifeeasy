const AuthReducer = (
	state = {
		firstName: '',
		lastName: '',
		username: '',
		emails: [],
		loggedIn: false,
	},
	action,
) => {
	switch (action.type) {
		case 'SIGNIN':
			return signin(state, action.payload);
		// return { ...state, ...action.payload, loggedIn: true };
		case 'SIGNUP':
			return signup(state, action.payload);
		// return { ...state, loggedIn: false };
		case 'SIGNOUT':
			return signout(state, action.payload);
		// return { ...state, ...action.payload };
		default:
			return state;
	}
};

const signin = (state, payload) => {
	return {
		...state,
		firstName: payload.firstName || '',
		lastName: payload.lastName || '',
		username: payload.username || '',
		emails: [...payload.emails] || [''],
		loggedIn: true,
	};
};
const signup = (state, payload) => {
	// if (state.emails.includes())
	return {
		...state,
		firstName: payload.firstName || '',
		lastName: payload.lastName || '',
		username: payload.username || '',
		emails: [payload.email] || [''],
		loggedIn: false,
	};
};
const signout = (state, payload) => {
	return {
		firstName: '',
		lastName: '',
		username: '',
		emails: [],
		loggedIn: false,
	};
};
export default AuthReducer;
