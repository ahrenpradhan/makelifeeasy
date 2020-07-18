let AuthActions = {
  signIn: function (payload) {
    return {
      type: "SIGNIN",
      payload: payload,
    };
  },
  signOut: function (payload) {
    return {
      type: "SIGNOUT",
      payload: payload || false,
    };
  },
  signUp: function (payload) {
    return {
      type: "SIGNUP",
      payload: payload || false,
    };
  },
};
export default AuthActions;
