import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {
	Router,
	Route,
	Redirect
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { createMemoryHistory } from 'history';
import AppContainer from './app.container';
import NavigationComponent from '../components/navigation.component';
import AdminContainer from './admin.container';
import RegistrationContainer from './registration.container';
import LoginContainer from './login.container';
import HaleCreateComponent from '../components/admin/create/hale.create.component';
import {isAuth} from '../middlewars/auth.middleware';
import Auth from '../auth';
import store from '../store';
import '../assets/styles/form.style.scss';

var history;
if (typeof(window) !== 'undefined'){
	window.store = store;
    history = createBrowserHistory();
} else {
    history = createMemoryHistory(); //This kind of history is needed for server-side rendering.
}

export default class Main extends Component {
	componentDidMount() {
		isAuth('/auth');
	}

	render() {
		return (
			<div>
				<Provider key={module.hot ? Date.now() : store} store={store}>					
					<Router history={history}>
						<div>
							<NavigationComponent />
							<Route exact path="/" component={AppContainer} />
							<Route exact path="/registration" component={RegistrationContainer} />
							<Route exact path="/login" component={LoginContainer} />
							<Route exact path="/admin" 
								render={props => {
								    return Auth.isAuthenticated('auth') ? (
								      <AdminContainer {...props}/>
								    ) : (
								      <Redirect to={{
								        pathname: '/',
								        state: { from: props.location }
								      }}/>
								    )
							  	}
							}/>
							<Route exact path="/admin/create" component={HaleCreateComponent} />
						</div>
					</Router>
				</Provider>
			</div>
		)
	}
}