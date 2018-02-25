import React from 'react';
import PropTypes from 'prop-types';
// import { Scrollbars } from 'react-custom-scrollbars';
// import { Dropdown1, Dropdown2, Dropdown3, Dropdown4 } from './Dropdowns';

// class MenuDropdown extends Component {

// 	state = {
// 		height: '760px'
// 	};

// 	drops(e) {
// 		let drops = [<Dropdown1 />, <Dropdown2 />, <Dropdown3 />, <Dropdown4 />];
// 		return drops[e-1];
// 	}

// 	closeDropdown(e) {
// 		document.dispatchEvent(new MouseEvent('click'));
// 	}

// 	checkIfOpen() {
// 		let klasa = 'dropdown_wrapper dropdown clearfix';
// 		if(this.props.open) {
// 			klasa += ' open';
// 		}
// 		if(this.props.active === 4) {
// 			klasa += ' last';
// 		}
// 		return klasa;
// 	}

// 	render() {

// 		return (
// 			<div id={this.props.id} className={this.checkIfOpen()} ref="wrapper">

// 				<div className="dropdown_inner clearfix">
// 					{this.drops(this.props.active)}
// 				</div>

// 				<button className="btn-link close_btn" onClick={this.closeDropdown.bind(this)}>CLOSE MENU</button>
// 			</div>
// 		);
// 	}
// }



// const drops = (e) => {
// 	let drops = [<Dropdown1 />, <Dropdown2 />, <Dropdown3 />, <Dropdown4 />];
// 	return drops[e-1];
// }

// const checkIfOpen = (open, active) => {
// 	let klasa = 'dropdown_wrapper dropdown clearfix';
// 	if(open) {
// 		klasa += ' open';
// 	}
// 	if(active === 4) {
// 		klasa += ' last';
// 	}
// 	return klasa;
// }

// const MenuDropdown = props => {

// 	const closeDropdown = (e) => {
// 		document.dispatchEvent(new MouseEvent('click'));
// 	}

// 	return (
// 		<div id={props.id} className={checkIfOpen(props.open, props.active)}>

// 			<div className="dropdown_inner clearfix">
// 				{drops(props.active)}
// 			</div>

// 			<button className="btn-link close_btn" onClick={closeDropdown}>CLOSE MENU</button>
// 		</div>
// 	);
// }






// const drops = (e) => {
// 	let drops = [<Dropdown1 />, <Dropdown2 />, <Dropdown3 />, <Dropdown4 />];
// 	return drops[e-1];
// }

// const checkIfOpen = (open, active) => {
// 	let klasa = 'dropdown_wrapper dropdown clearfix';
// 	if(open) {
// 		klasa += ' open';
// 	}
// 	if(active === 4) {
// 		klasa += ' last';
// 	}
// 	return klasa;
// }

const MenuDropdown = props => {

	const closeDropdown = (e) => {
		document.dispatchEvent(new MouseEvent('click'));
	}

	let klasa = 'dropdown_wrapper dropdown clearfix';
	if(props.open) {
		klasa += ' open';
	}
	if(props.active === 4) {
		klasa += ' last';
	}

	return (
		<div id={props.id} className={klasa}>
			<div className="dropdown_inner clearfix">{props.children}</div>
			<button className="btn-link close_btn" onClick={closeDropdown}>CLOSE MENU</button>
		</div>
	);
}

MenuDropdown.defaultProps = {
	active: 1,
	open: false
}

MenuDropdown.propTypes = {
	active: PropTypes.number,
	open: PropTypes.bool
}

export default MenuDropdown;
