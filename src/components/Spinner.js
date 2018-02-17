import React, { Component } from 'react';

export default class Spinner extends Component {
	render() {
		return (
			<div className="spinner">
				<svg viewBox="25 25 50 50">
					<circle cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
				</svg>
			</div>
		);
	}
}
