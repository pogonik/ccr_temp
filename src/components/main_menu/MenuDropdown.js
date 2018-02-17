import React, { Component } from 'react';
// import { Scrollbars } from 'react-custom-scrollbars';
import { Dropdown1, Dropdown2, Dropdown3, Dropdown4 } from './Dropdowns';

class MenuDropdown extends Component {

	state = {
		height: '760px'
	};

	drops(e) {
		let drops = [<Dropdown1 />, <Dropdown2 />, <Dropdown3 />, <Dropdown4 />];
		return drops[e-1];
	}

	closeDropdown(e) {
		document.dispatchEvent(new MouseEvent('click'));
	}

	checkIfOpen() {
		let klasa = 'dropdown_wrapper dropdown clearfix';
		if(this.props.open) {
			klasa += ' open';
		}
		if(this.props.active === 4) {
			klasa += ' last';
		}
		return klasa;
	}

	render() {

		return (
			<div id={this.props.id} className={this.checkIfOpen()} ref="wrapper">

					<div className="dropdown_inner clearfix">
						{this.drops(this.props.active)}
					</div>

				<button className="btn-link close_btn" onClick={this.closeDropdown.bind(this)}>CLOSE MENU</button>
			</div>
		);
	}
}

MenuDropdown.defaultProps = {
	active: 1
}

export default MenuDropdown;
