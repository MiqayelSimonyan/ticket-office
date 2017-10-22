import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/navigation.style.scss';
import Auth from '../auth';

export default class NavigationComponent extends Component {
	logOut() {
		Auth.deAuthenticate('admin');
		Auth.deAuthenticate('auth');
		Auth.deAuthenticate('username');
	}

	render() {
		return (
			<div>	
				<nav className="navigation">
					{
						Auth.isAuthenticated('auth') ?
							<ul>
								<li className="navigation_item navigation_home_item"><NavLink to="/" activeClassName="navigation_active"><img src="../assets/images/ticket.png" /></NavLink></li>
								<li className="navigation_item"><NavLink to="/Admin" activeClassName="navigation_active">Admin</NavLink></li>
								<li className="navigation_item logOut"><a href="/auth/signout" onClick={this.logOut}>Log Out</a></li>
							</ul>
						:
							<ul>
								<li className="navigation_item navigation_home_item"><NavLink to="/" activeClassName="navigation_active"><img src="../assets/images/ticket.png" /></NavLink></li>
								<li className="navigation_item"><NavLink to="/registration" activeClassName="navigation_active">Registration</NavLink></li>
								<li className="navigation_item"><NavLink to="/login" activeClassName="navigation_active">Login</NavLink></li>
							</ul>
					}
				</nav>				
			</div>
		)
	}
}