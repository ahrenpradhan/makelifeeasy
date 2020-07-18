import React from 'react';

import Dashboard from '../../components/dashboard';
import Drawer from '../../components/drawer';

import Content from './content';
import { Route, Switch } from 'react-router';

class Landing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
	}
	handleDrawerOpen = () => {
		this.setState((prevState) => ({ open: !prevState.open }));
	};
	render() {
		return (
			<div>
				<Dashboard handleDrawerOpen={this.handleDrawerOpen} open={this.state.open} />
				<Switch>
					<Route exact path='/dashboard'>
						<Drawer open={this.state.open} />
					</Route>
					<Route exact path='/dashboard/home'>
						<Drawer open={this.state.open} />
					</Route>
				</Switch>
				<Content open={this.state.open} />
			</div>
		);
	}
}

export default Landing;
