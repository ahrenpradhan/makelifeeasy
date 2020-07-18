let RouteActions = {
	signIn: function () {
		return {
			type: 'SIGNIN',
		};
	},
	signOut: function () {
		return {
			type: 'SIGNOUT',
		};
	},
	dashboard: function () {
		return {
			type: 'dashboard',
		};
	},
};
export default RouteActions;
