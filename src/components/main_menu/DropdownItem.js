import React from 'react';

// class DropdownItem extends Component {

// 	constructor(props) {
// 		super(props);
// 	}

// 	handleClick = (e) => {
// 		e.preventDefault();
// 	}

// 	render() {
// 		return (
// 			<li {...this.props} class="menu_item">
// 				<a href={this.props.link} onClick={this.handleClick}>{this.props.label}</a>
// 			</li>
// 		);
// 	}
// }

const DropdownItem = props => {

	// const handleClick = (e) => {
	// 	e.preventDefault();
	// }

	return (
		<li {...props} class="menu_item">
			<a href={props.link} onClick={(e) => { e.preventDefault() }}>{props.label}</a>
		</li>
	);
}

DropdownItem.defaultProps = {
	label: '',
	link: '#'
}

export default DropdownItem;
