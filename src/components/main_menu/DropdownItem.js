import React, { Component } from 'react';

class DropdownItem extends Component {

	constructor(props) {
		super(props);
	}

	handleClick = (e) => {
		e.preventDefault();
	}

	render() {
		return (
			<li {...this.props} class="menu_item">
				<a href={this.props.link} onClick={this.handleClick}>{this.props.label}</a>
			</li>
		);
	}
}

DropdownItem.defaultProps = {
	label: '',
	link: '#'
}

export default DropdownItem;
