import React, { Component } from 'react';

class MenuItem extends Component {

	state = {
	};

	constructor(props) {
		super(props);
	}

	handleTheClick = (e) => {
		e.preventDefault();
	}

	render() {
		return (
			<li {...this.props} class="menu_item">
				<a href={this.props.link} onClick={this.handleTheClick}>{this.props.label}</a>
			</li>
		);
	}
}

MenuItem.propTypes = {
	label: PropTypes.string,
	link: PropTypes.string,
}

MenuItem.defaultProps = {
	label: '',
	link: '#'
}

export default MenuItem;
