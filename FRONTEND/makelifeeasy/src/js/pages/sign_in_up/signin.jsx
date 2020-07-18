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

import { useDispatch } from 'react-redux';
import AuthActions from '../../actions/authaction.js';

import { UserRoutes } from '../../routes';
import { useHistory } from 'react-router-dom';

// import { emailValidation } from '../../helpers/inputvalidation';

const SignIn = (props) => {
	const classes = props.useStyles();
	const theme = props.theme;
	const history = useHistory();
	const dispatch = useDispatch();
	const [error, setError] = React.useState(false);
	const [signin, setSignIn] = React.useState(false);
	const [signInDetail, setSignInDetail] = React.useState({
		username: '',
		password: '',
		checked: false,
	});
	const handleUsername = (username) => {
		// setValidEmail(emailValidation(email));
		setSignInDetail({ ...signInDetail, username });
	};
	const handlePassword = (password) => {
		password = password.trim();
		setSignInDetail({ ...signInDetail, password });
	};
	const handleChecked = (checked) => {
		setSignInDetail({ ...signInDetail, checked });
	};
	const routeToSignUp = () => {
		history.push('/signup');
	};
	const signIn = () => {
		setSignIn(true);
		UserRoutes.signIn({
			username: signInDetail.username,
			password: signInDetail.password,
		})
			.then((res) => {
				if (res.access) {
					const obj = {
						firstName: res.doc.firstName,
						lastName: res.doc.lastName,
						username: res.doc.username,
						emails: res.doc.emails,
					};
					dispatch(AuthActions.signIn(obj));
				} else {
					setError(true);
					setSignInDetail({ ...signInDetail, password: '' });
					setSignIn(false);
				}
			})
			.catch((err) => {
				setSignInDetail({ ...signInDetail, password: '' });
				setSignIn(false);
				console.error(err);
			});
	};
	return (
		<div className={classes.paper}>
			<Avatar className={classes.avatar}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component='h1' variant='h5'>
				Sign in
			</Typography>
			<ThemeProvider theme={theme}>
				<TextField
					value={signInDetail.username}
					onChange={(event) => handleUsername(event.target.value)}
					variant='outlined'
					margin='normal'
					required
					fullWidth
					id='username'
					label='Username'
					name='username'
					autoComplete='username'
					autoFocus
				/>
				{/* {!validEmail && <div style={{ width: '100%', color: 'red' }}>Username format incorrect</div>} */}
				<TextField
					value={signInDetail.password}
					onChange={(event) => handlePassword(event.target.value)}
					variant='outlined'
					margin='normal'
					required
					fullWidth
					name='password'
					label='Password'
					type='password'
					id='password'
					autoComplete='current-password'
				/>
				{error && <div style={{ width: '100%', color: 'red' }}>Username or password is incorrect</div>}
				<FormControlLabel
					value={signInDetail.checked}
					onChange={(event) => handleChecked(event.target.checked)}
					control={<Checkbox value='remember' color='primary' />}
					label='Remember me'
				/>
				<Button
					type='submit'
					fullWidth
					variant='contained'
					color='primary'
					className={classes.submit}
					disabled={signin || !(signInDetail.username && signInDetail.password)}
					onClick={signIn}>
					{signin ? 'Signing in, please wait.' : 'Sign In'}
				</Button>
			</ThemeProvider>
			<Grid container>
				<Grid item xs>
					<Link href='#' variant='body2'>
						Forgot password?
					</Link>
				</Grid>
				<Grid item>
					<Link variant='body2' onClick={routeToSignUp}>
						{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
			</Grid>
		</div>
	);
};

export default SignIn;
