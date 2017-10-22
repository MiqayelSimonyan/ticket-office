import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DeleteError, deleteSuccess} from '../../AC';
import '../../assets/styles/alert.style.scss';

class MessageContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		setTimeout(() => {
			this.deleteErrorMessage(
				this.props.error ? 
					this.props.error.id :
				this.props.success ? 
					this.props.success.id :
				''
			);
		}, this.props.duration || 5000);
	}

	deleteErrorMessage(id) {
		this.props.error ? this.props.RemoveError(id) : this.props.RemoveSuccess(id);
	}
 
	render() {
		return (
			<div className="alert_item" style={{background: this.props.error ? '#c12222' : '#98962c'}}>
				<div className="error_name_wrapper">
					<span className="error_name">
						{
							this.props.error ? this.props.error.message.toString() : 
							this.props.success ? this.props.success.message.toString() : ''
						}
					</span>
				</div>
				<div className="err_delet_btn_wrappper">
					<span className="err_delet_btn"
						onClick={
							this.props.error ?
								this.deleteErrorMessage.bind(this, this.props.error.id) :
							this.props.success ?
								this.deleteErrorMessage.bind(this, this.props.success.id) :
							''
						}>
						X
					</span>
				</div>
			</div>
		)
	}
}

export default connect(
	null,
	dispatch => ({
		RemoveError: (id) => {
			dispatch(DeleteError(id))
		},
		RemoveSuccess: (id) => {
			dispatch(deleteSuccess(id))
		}
	})
)(MessageContainer);