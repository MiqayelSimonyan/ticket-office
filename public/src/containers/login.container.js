import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import AlertContainer from '../containers/alert/alert.container';
import LoginComponent from '../components/login.component';
import {login} from '../middlewars/admin.middleware';

class LoginContainer extends Component {
	onSubmit(event) {
		event.preventDefault();
		let name = this.name.value;
		let username = this.username.value;
		let email = this.email.value;
		let password = this.password.value;

		this.props.AddAdmin('/auth/signin', {name, username, email, password}, this.props);
	}

	render() {		
		return <div className="form_wrapper login_form_wrapper">			
			{
				this.props.errors.length ? <AlertContainer errors={this.props.errors} duration="8000" /> :
				this.props.success.length ? <AlertContainer errors={this.props.success} duration="8000" /> : ''
			}
			<LoginComponent {...this.props} onSubmit={this.onSubmit} />
		</div>
	}
}

export default withRouter(connect(
	state => ({
		errors: state.Errors,
		success: state.Success
	}),
	dispatch => ({
		AddAdmin: (url, data, props) => {
			dispatch(login(url, data, props))
		}
	})
)(LoginContainer));