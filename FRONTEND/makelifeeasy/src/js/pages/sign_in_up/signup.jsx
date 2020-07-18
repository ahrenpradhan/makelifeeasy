import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import AuthActions from '../../actions/authaction.js';

import { emailValidation, passwordValidation } from '../../helpers/inputvalidation';
import { UserRoutes } from '../../routes/index.js';

const SignIn = (props) => {
	const classes = props.useStyles();
	const theme = props.theme;
	const dispatch = useDispatch();
	const history = useHistory();
	const [signup, setSignUp] = React.useState(false);
	const [validEmail, setValidEmail] = React.useState(true);
	const [validPassword, setValidPassword] = React.useState({
		uppercase: true,
		lowercase: true,
		numerical: true,
		special: true,
		passLength: true,
	});
	const [signUpDetail, setSignUpDetail] = React.useState({
		firstName: '',
		lastName: '',
		username: '',
		usernamePlaceholder: '',
		email: '',
		password: '',
		checked: false,
	});
	const handleFirstName = (firstName) => {
		firstName = firstName.trimLeft();
		const username = (firstName + signUpDetail.lastName).toLowerCase().split(' ').join('').slice(0, 16);
		const usernamePlaceholder = username;
		setSignUpDetail({ ...signUpDetail, firstName, username, usernamePlaceholder });
	};
	const handleLastName = (lastName) => {
		lastName = lastName.trimLeft();
		const username = (signUpDetail.firstName + lastName).toLowerCase().split(' ').join('').slice(0, 16);
		const usernamePlaceholder = username;
		setSignUpDetail({ ...signUpDetail, lastName, username, usernamePlaceholder });
	};
	const handleUsername = (username) => {
		username = username.split(' ').join('');
		setSignUpDetail({ ...signUpDetail, username });
	};
	const handleEmail = (email) => {
		setValidEmail(emailValidation(email));
		setSignUpDetail({ ...signUpDetail, email });
	};
	const handlePassword = (password) => {
		setValidPassword(passwordValidation(password));
		setSignUpDetail({ ...signUpDetail, password });
	};
	const handleChecked = (checked) => {
		setSignUpDetail({ ...signUpDetail, checked });
	};
	const routeToSignIn = () => {
		history.push('/signin');
	};
	const signUp = () => {
		setSignUp(true);
		UserRoutes.signUp({
			firstName: signUpDetail.firstName,
			lastName: signUpDetail.lastName,
			username: signUpDetail.username,
			email: signUpDetail.email,
			password: signUpDetail.password,
		})
			.then((res) => {
				if (res.access) {
					dispatch(
						AuthActions.signUp({
							firstName: signUpDetail.firstName,
							lastName: signUpDetail.lastName,
							username: signUpDetail.username,
						}),
					);
					routeToSignIn();
				} else {
					setSignUpDetail({ ...setSignUp, password: '' });
					setSignUp(false);
				}
			})
			.catch((err) => {
				setSignUpDetail({ ...setSignUp, password: '' });
				setSignUp(false);
				console.error(err);
			});
	};
	return (
		<div className={classes.paper}>
			<Avatar className={classes.avatar}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component='h1' variant='h5'>
				Sign up
			</Typography>
			<ThemeProvider theme={theme}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							value={signUpDetail.firstName}
							onChange={(event) => handleFirstName(event.target.value)}
							autoComplete='fname'
							name='firstName'
							variant='outlined'
							required
							fullWidth
							id='firstName'
							label='First Name'
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							value={signUpDetail.lastName}
							onChange={(event) => handleLastName(event.target.value)}
							variant='outlined'
							required
							fullWidth
							id='lastName'
							label='Last Name'
							name='lastName'
							autoComplete='lname'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={signUpDetail.username}
							onChange={(event) => handleUsername(event.target.value)}
							variant='outlined'
							placeholder={'Example : ' + signUpDetail.usernamePlaceholder}
							required
							fullWidth
							id='username'
							label='Username'
							name='username'
							autoComplete='username'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={signUpDetail.email}
							onChange={(event) => handleEmail(event.target.value)}
							variant='outlined'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
						/>
						{!validEmail && <div style={{ width: '100%', color: 'red' }}>Username format incorrect</div>}
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={signUpDetail.password}
							onChange={(event) => handlePassword(event.target.value)}
							variant='outlined'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						{!(
							validPassword.uppercase &&
							validPassword.lowercase &&
							validPassword.numerical &&
							validPassword.special &&
							validPassword.passLength
						) && (
							<div style={{ width: '100%', color: 'red' }}>
								Password must contain
								<ul style={{ marginTop: 0 }}>
									{!validPassword.uppercase && <li>at least one capital letter</li>}
									{!validPassword.lowercase && <li>at least one small letter</li>}
									{!validPassword.numerical && <li>at least one numerical character</li>}
									{!validPassword.special && <li>at least one special character</li>}
									{!validPassword.passLength && <li>length 6-20 character</li>}
								</ul>
							</div>
						)}
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							value={signUpDetail.checked}
							onChange={(event) => handleChecked(event.target.checked)}
							control={<Checkbox value='allowExtraEmails' color='primary' />}
							label='I want to receive inspiration, marketing promotions and updates via email.'
						/>
					</Grid>
				</Grid>
				<Button
					type='submit'
					fullWidth
					variant='contained'
					color='primary'
					disabled={
						signup ||
						!(
							validEmail &&
							validPassword.uppercase &&
							validPassword.lowercase &&
							validPassword.numerical &&
							validPassword.special &&
							validPassword.passLength &&
							signUpDetail.email &&
							signUpDetail.password &&
							signUpDetail.firstName &&
							signUpDetail.lastName &&
							signUpDetail.username
						)
					}
					className={classes.submit}
					onClick={signUp}>
					{signup ? ' Signing up, please wait.' : 'Sign Up'}
				</Button>
			</ThemeProvider>
			<Grid container justify='flex-end'>
				<Grid item>
					<Link variant='body2' onClick={routeToSignIn}>
						Already have an account? Sign in
					</Link>
				</Grid>
			</Grid>
		</div>
	);
};

export default SignIn;
