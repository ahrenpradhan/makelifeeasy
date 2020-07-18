const emailValidation = (mail) => {
	var emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (mail.match(emailregex)) {
		return true;
	}
	return false;
};

const passwordValidation = (password) => {
	// var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
	// if (password.match(passw)) {
	// 		return true;
	// }
	// return false;
	return {
		uppercase: /[A-Z]/.test(password),
		lowercase: /[a-z]/.test(password),
		numerical: /\d/.test(password),
		special: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password),
		passLength: password.length >= 6 && password.length <= 20,
	};
};

export { emailValidation, passwordValidation };
