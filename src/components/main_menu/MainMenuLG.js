import React, { Component } from 'react';
// import { Scrollbars } from 'react-custom-scrollbars';
import { baseUrl } from '../../lib/constants';

//import { MenuArrowIcon, MenuIcon, ReturnIcon, FAQIcon, ContactIcon, Caret2 } from '../../svg/Icons';

import { Dropdown1, Dropdown2, Dropdown3, Dropdown4 } from './Dropdowns';

import MenuDropdown from './MenuDropdown';


const dropDowns = [<Dropdown1 />, <Dropdown2 />, <Dropdown3 />, <Dropdown4 />];

class MainMenuLG extends Component {

	state = {
		activeItem: 0,
		dropdownOpen: false
	};

	componentDidMount () {
		document.addEventListener('click', this.handleDocumentClick);
	}

	componentWillUnmount () {
		document.removeEventListener('click', this.handleDocumentClick);
	}

	handleDocumentClick = (e) => {
		const area = this.refs.main_menu;
		if (!area.contains(e.target)) {
			this.closeDropdown();
		}
	};

	closeDropdown() {
		if(document.querySelector('#main_menu .nav > li.active'))
			document.querySelector('#main_menu .nav > li.active').classList.remove('active');

		this.setState({ dropdownOpen: false, activeItem: 0 });
	}

	handleClick = (i, ref) => {

		if(document.querySelector('#main_menu .nav > li.active'))
			document.querySelector('#main_menu .nav > li.active').classList.remove('active');

		if(this.state.activeItem === i) {
			this.closeDropdown();
		}
		else if(i !== null && i !== 0) {
			// this.refs[a].classList.add('active');
			document.querySelector("#main_menu .nav li."+ref).classList.add('active');
			this.setState({ activeItem: i, dropdownOpen: true });
		} else {
			this.setState({ dropdownOpen: false, activeItem: 0 });
		}
	};

	collapseBox = (val, e) => {
		e.preventDefault();
		document.querySelectorAll(".open").classList.remove('open');
		document.querySelectorAll(".active").classList.remove('active');
		document.querySelector("#"+val).classList.toggle('open');
		document.querySelector("a."+val).classList.toggle('active');
		// $("open").removeClass('open');
		// $("active").removeClass('active');
		// $("#"+val).toggleClass('open');
		// $("a."+val).toggleClass('active');
	};

	render() {

		let visina = window.innerHeight+'px';

		if(localStorage.dropdown && localStorage.dropdown === false) {
			this.closeDropdown();
		}

		return (
			<div id="main_menu" ref="main_menu">
				<span className="visible-lg clearfix">
					<ul className="nav navbar-nav">
						<li className="menu_item home">
							<a href={baseUrl}>HOME</a>
						</li>
						<li className="menu_item refein" ref="refein">
							<a onClick={this.handleClick.bind(this, 1, 'refein')}>MOTORRAD-REFEIN</a>
						</li>
						<li className="menu_item teilen" ref="teilen">
							<a onClick={this.handleClick.bind(this, 2, 'teilen')}>Teilen & Zubehör</a>
						</li>
						<li className="menu_item">
							<a href={baseUrl+'reifenmontage'}>REFEINMONTAGE</a>
						</li>
						<li className="menu_item auto" ref="auto">
							<a onClick={this.handleClick.bind(this, 3, 'auto')}>AUTOREFEIN</a>
						</li>
						<li className="menu_item uber" ref="uber">
							<a onClick={this.handleClick.bind(this, 4, 'uber')}>ÜBER UNS</a>
						</li>
					</ul>
				</span>
				<MenuDropdown open={this.state.dropdownOpen} active={this.state.activeItem}>
					{dropDowns[this.state.activeItem - 1]}
				</MenuDropdown>
			</div>
		);
	}
}

MainMenuLG.defaultProps = {
	activeItem: 0
}

export default MainMenuLG;
