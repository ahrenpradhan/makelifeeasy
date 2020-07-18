import React from 'react';
import { Route, Redirect, Switch } from 'react-router';

import SignInUp from './pages/sign_in_up/index';
import Landing from './pages/landing';

import { useSelector } from 'react-redux';

const App = () => {
	const AuthReducer = useSelector((state) => state.AuthReducer);
	return !AuthReducer.loggedIn ? (
		<div>
			<Redirect to='/dashboard' />
			<Landing />
		</div>
	) : (
		<div>
			<Switch>
				<Route exact path='/signin' />
				<Route exact path='/signup' />
				<Route path='/'>
					<Redirect to='/signin' />
				</Route>
			</Switch>
			<SignInUp />
		</div>
	);
};

export default App;
