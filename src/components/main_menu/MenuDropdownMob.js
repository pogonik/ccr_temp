import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Dropdown1, Dropdown2, Dropdown3, Dropdown4 } from './Dropdowns';
// require('es6-promise').polyfill();

// require('velocity-animate/velocity.js');
// require('velocity-animate/velocity.ui.js');
import anime from 'animejs';


class MenuDropdownMob extends Component {

	thumbsHeight() {
		let thumbs = document.querySelectorAll("#main_menu .dropdown .thumb");

		thumbs.forEach(key => {
			// let sirina = $(this).width();
		});
		// $("#main_menu .dropdown .thumb").each(function(i, e) {
		// 	let sirina = $(this).width();
		// 	$(this).height(sirina/1.2);
		// });
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.active) {

			anime({
				targets: '#'+this.props.id,
				left: 0,
				// easing: [10, 5],
				easing: 'linear',
				duration: 750,
				begin: el => {
					this.refs.wrapper.style.height = '100%';
					this.refs.wrapper.style.left = window.innerWidth.toString()+'px';
				}
			});

			// document.getElementById('#'+this.props.id).velocity({ left:0 }, {
			// 	easing: [10, 5],
			// 	duration: 750,
			// 	begin: el => {
			// 		this.refs.wrapper.style.height = '100%';
			// 		this.refs.wrapper.style.left = window.innerWidth.toString()+'px';
			// 	}
			// });

		}
	}

	drops(e) {
		let drops = [<Dropdown1 />, <Dropdown2 />, <Dropdown3 />, <Dropdown4 />];
		return drops[e-1];
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
		let visina = window.innerHeight;
		this.thumbsHeight();
		return (
			<div id={this.props.id} className={this.checkIfOpen()} ref="wrapper">

				<div className="dropdown_inner clearfix">
					<Scrollbars style={{height:visina}}>
						{this.drops(this.props.active)}
					</Scrollbars>
				</div>

				<button className="btn-link close_btn" onClick={this.props.close}>CLOSE MENU</button>
			</div>
		);
	}
}

MenuDropdownMob.defaultProps = {
	active: 1,
	mobile: false
}

export default MenuDropdownMob;
