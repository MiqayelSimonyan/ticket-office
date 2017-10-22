import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import AlertContainer from '../containers/alert/alert.container';
import RegistrationComponent from '../components/registration.component';
import {createAdmin} from '../middlewars/admin.middleware';

class RegistrationContainer extends Component {
	onSubmit(event) {
		event.preventDefault();
		let name = this.name.value;
		let username = this.username.value;
		let email = this.email.value;
		let password = this.password.value;

		this.props.AddAdmin('/auth/signup', {name, username, email, password}, this.props);
	}

	render() {
		return <div className="form_wrapper">			
			{
				this.props.errors.length ?
					<AlertContainer errors={this.props.errors} duration="8000" /> :
				this.props.success.length ?
					<AlertContainer errors={this.props.success} duration="8000" /> :
				''
			}
			<RegistrationComponent {...this.props} onSubmit={this.onSubmit} />
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
			dispatch(createAdmin(url, data, props))
		}
	})
)(RegistrationContainer));