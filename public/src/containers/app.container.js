import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../assets/styles/main.style.scss';

export default class AppContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className="container">
			<h1>Ticket Office</h1>
		</div>
	}
}