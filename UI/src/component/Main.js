import React from "react";
import Navbar from "./Navbar";
import Home from './Home';
import Account from './Account';
import Profile from './Profile';
import User from './User';
import About from './About';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class Main extends React.Component {
  constructor(props){
    super(props)
    this.state={
      path: "/"
    }
  };
  handleUpdateRoutePath = (path)=>{
    this.setState({path});
  };
  render () {
    return (
      <div>
        <Router>
            <Navbar
              handleUpdateRoutePath={this.handleUpdateRoutePath}
            />
            <Switch>
              {/* user routes */}
              <Route path="/user/myaccount" component={Account}/>
              <Route path="/user/profile" component={Profile}/>
              <Route exact path="/user" component={User}/>
              {/* about route */}
              <Route path="/about" component={About}/>
              {/* home page route */}
              <Route exact path="/" component={Home}/>
            </Switch>
        </Router>
      </div>
    )
  }
}