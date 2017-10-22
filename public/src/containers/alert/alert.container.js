import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DeleteError} from '../../AC';
import MessageContainer from './message.container';

class AlertContainer extends Component {
	render() {
		console.log('this.props.errors', this.props.errors);
		return (
			<div className="alert_wrapper">
				{
					this.props.success && this.props.success.length ?
						this.props.success.map((success, index) => {
							return (
								<MessageContainer
									key={success.id}
									success={success}
									duration={this.props.duration} />
							)
						})
					: this.props.errors && this.props.errors.length ?
						this.props.errors.map((error, index) => {
							return (
								<MessageContainer
									key={error.id}
									error={error}
									duration={this.props.duration} />
							)
						})
					: ''
				}
			</div>
		)
	}
}

export default connect(
	state => ({
		errors: state.Errors,
		success: state.Success
	})
)(AlertContainer);