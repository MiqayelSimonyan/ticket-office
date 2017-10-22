import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createHall } from '../../../middlewars/admin.middleware';
import '../../../assets/styles/admin.style.scss';

class HaleCreateComponent extends Component {
	constructor(props) {
		console.log('hole');
		super(props);
		this.createHoll = this.createHoll.bind(this);
	}

	createHoll(event) {
		event.preventDefault();
		var hall = {name: this.hall ? this.hall.value : ''}
		this.props.AddHall('/admin/hall', hall);
	}

	render() {
		return (
			<div className="admin_wrapper">
				<form onSubmit={this.createHoll}>
					<div className="form_item_group">
						<div><label htmlFor="hall">Create Hall</label></div>
						<input ref={input => this.hall = input} type="text" id="hall" name="hall" placeholder="Hall" />
					</div>
					<div className="form_item_group">
						<button className="form_submit_btn">Create Hall</button>
					</div>
				</form>
			</div>
		)
	}
}

export default connect(
	null,
	dispatch => ({
		AddHall: (url, hall) => {
			dispatch(createHall(url, hall))
		}
	})
)(HaleCreateComponent);