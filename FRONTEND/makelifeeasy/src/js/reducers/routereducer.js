const RouteReducer = (
	state = {
		follow: false,
		route: 'SIGNIN',
	},
	action,
) => {
	switch (action.type) {
		case 'SIGNIN':
			return { ...state, route: action.payload };
		case 'SIGNUP':
			return { ...state, route: action.payload };
		case 'SIGNOUT':
			return { ...state, route: action.payload };
		default:
			return state;
	}
};
export default RouteReducer;
