import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Redirect, Switch } from 'react-router';
import Home from './homepage';
import Create from './createpage';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	drawerPaperOpen: {
		marginLeft: drawerWidth,
		padding: theme.spacing(4),
		transition: theme.transitions.create(['margin-left', 'padding'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		marginLeft: 60,
		padding: theme.spacing(4, 8),
		transition: theme.transitions.create(['margin-left', 'padding'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
}));

const Content = ({ open }) => {
	const classes = useStyles();
	return (
		<div
			className={(open ? classes.drawerPaperOpen : classes.drawerPaperClose) + ' ' + classes.content}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				marginTop: 64,
			}}>
			<Switch>
				<Route exact path='/dashboard/home' component={Home} />
				<Route exact path='/dashboard/create' component={Create} />
				<Route path='/'>
					<Redirect to='/dashboard/create' />
				</Route>
			</Switch>
		</div>
	);
};

export default Content;
