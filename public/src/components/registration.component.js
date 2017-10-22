import React, {Component} from 'react';

export default class RegistrationComponent extends Component {
	render() {
		return (
			<div>
				<h3>Registration</h3>
				<form onSubmit={this.props.onSubmit.bind(this)}>
					<div className="form_item_group">
						<div>
							<label htmlFor="name">Name:</label>
						</div>
						<input className="form_item" ref={input => this.name = input} type="text" id="name" name="name" placeholder="Name" />
					</div>
					<div className="form_item_group">
						<div>
							<label htmlFor="username">Username:</label>
						</div>
						<input className="form_item" ref={input => this.username = input} type="text" id="username" name="username" placeholder="Username" />
					</div>
					<div className="form_item_group">
						<div>
							<label htmlFor="email">Email:</label>
						</div>
						<input className="form_item" ref={input => this.email = input} type="email" id="email" name="email" placeholder="Email" />
					</div>
					<div className="form_item_group">
						<div>
							<label htmlFor="password">Password:</label>
						</div>
						<input className="form_item" ref={input => this.password = input} type="password" id="password" name="password" placeholder="Password" />
					</div>
					<div className="form_item_group">
						<button className="form_submit_btn">Create Admin</button>
					</div>
				</form>
			</div>
		)
	}
}