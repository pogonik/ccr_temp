import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { baseUrl } from '../../lib/constants';

import { MenuArrowIcon, ReturnIcon, FAQIcon, ContactIcon, Caret2 } from '../../svg/Icons';

import MenuDropdown from './MenuDropdownMob';

import anime from 'animejs';

class MainMenuMob extends Component {

	state = {
		activeItem: 0,
		dropdownOpen: false
	};

	closeDropdown() {

		//$('#mob_dropdown_wrapper').velocity({ left:window.innerWidth }, {
		// document.querySelector('#mob_dropdown_wrapper').velocity({ left:window.innerWidth }, {
		// 	easing: 'easeOut',
		// 	duration: 300,
		// 	complete: el => {
		// 		//$('#main_menu .nav > li.active').removeClass('active');
		// 		document.querySelector('#main_menu .nav > li.active').classList.remove('active');
		// 		this.setState({ dropdownOpen: false, activeItem: 0 });
		// 	}
		// });

		anime({
			targets: '#mob_dropdown_wrapper',
			left:window.innerWidth,
			easing: 'linear',
			duration: 300,
			complete: el => {
				document.querySelector('#main_menu .nav > li.active').classList.remove('active');
				this.setState({ dropdownOpen: false, activeItem: 0 });
			}
		});
	}

	handleClick = (i, ref) => {

		//$('#main_menu .nav > li.active').removeClass('active');
		if(document.querySelector('#main_menu .nav > li.active'))
			document.querySelector('#main_menu .nav > li.active').classList.remove('active');

		if(this.state.activeItem === i) {
			this.closeDropdown();
		} else {
			//$("#main_menu .nav li."+ref).addClass('active');
			document.querySelector("#main_menu .nav li."+ref).classList.add('active');

			anime({
				targets: '#mob_dropdown_wrapper',
				left:window.innerWidth,
				easing: 'linear',
				duration: 300,
				complete: el => {
					this.setState({ activeItem: i, dropdownOpen: true });
				}
			});
		}
	};

	slideMenu = (e) => {
		if(this.state.activeItem === 0) {
			document.querySelector("body").classList.toggle('noscroll');
			document.querySelector("#main_menu").classList.toggle('open');
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

		let accountLink = (
			<a href="#" className="btn btn-default parent mob_account_box" onClick={this.collapseBox.bind(this, 'mob_account_box')}>
				<span className="icon"><img src="catalog/view/theme/ccr/images/svg/user_icon.svg" width="20" /></span>
				<span className="btnLabel"> My Account</span>
				<Caret2 size="17" fill="#FFF" className="caret2" />
			</a>
		);

		if(document.querySelector("body.logged")) {
			accountLink = (
				<a href="index.php?route=account/account" className="btn btn-default parent mob_account_box">
					<span className="icon"><img src="catalog/view/theme/ccr/images/svg/user_icon.svg" width="20" /></span>
					<span className="btnLabel"> My Account</span>
					<Caret2 size="17" fill="#FFF" className="caret2" />
				</a>
			);
		}

		return (

			<div id="main_menu" className="main_menu_mob" ref="main_menu">

				<MenuDropdown id="mob_dropdown_wrapper" ref="mob_dropdown_wrapper" open={this.state.dropdownOpen} active={this.state.activeItem} close={() => { this.closeDropdown() }} />

				<Scrollbars style={{height:visina}} id="navigacija">
					<ul className="nav navbar-nav">
						<li className="menu_item home">
							<span>MENU <a href="#" className="toggleMenu" onClick={this.slideMenu}><MenuArrowIcon /></a></span>
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

					<div className="clearfix"></div>

					<div id="cart_links">
						<ul>
							<li>

								{accountLink}

								<div id="mob_account_box" className="accordion clearfix links_box">
									<form className="login_form clearfix" action={baseUrl+'index.php?route=account/login'} method="post" encType="multipart/form-data">
										<div className="form-group">
											<input type="text" name="email" placeholder="Email" className="form-control" />
										</div>
										<div className="form-group clearfix">
											<input type="password" name="password" placeholder="Password" className="form-control" />
											<a className="link right" href={baseUrl+'index.php?route=account/forgotten'}>{'Forgot?'}</a>
										</div>
										<button className="btn btn-default submit left">Sign In</button>
										<a className="btn-flat btn-register right" href="<?= $base; ?>index.php?route=account/register">
											CREATE AN ACCOUNT
										</a>
									</form>
								</div>
							</li>
							<li>
								<a href="#" className="btn btn-default parent mob_cart_box" onClick={this.collapseBox.bind(this, 'mob_cart_box')}>
									<span className="icon"><img src="catalog/view/theme/ccr/images/svg/bag_icon.svg" width="20" /></span>
									<span className="btnLabel"> My Cart</span>
									<Caret2 size="17" fill="#FFF" className="caret2" />
								</a>
								<div id="mob_cart_box" className="accordion clearfix links_box">
									<div className="inner_box">
										<span className="text_empty">Your shopping cart is empty!</span>
									</div>
								</div>
							</li>
							<li className="likeBtn">
								<a href="#" className="btn btn-default parent mob_like_box" onClick={this.collapseBox.bind(this, 'mob_like_box')}>
									<span className="icon"><img src="catalog/view/theme/ccr/images/svg/heart_icon.svg" width="18" /></span>
									<span className="btnLabel"> Favorites</span>
									<Caret2 size="17" fill="#FFF" className="caret2" />
								</a>
								<div id="mob_like_box" className="accordion clearfix links_box">
									<div className="inner_box">
										<a href="index.php?route=account/wishlist">Check your favorites ›</a>
									</div>
								</div>
							</li>
						</ul>
					</div>

					<div id="other_links">
						<ul className="nav nav-pills nav-stacked">
							<li>
								<a href="index.php?route=account/return" className="btn btn-default">
									<span className="icon"><ReturnIcon size="20" /></span>
									<span className="btnLabel"> Return</span>
								</a>
							</li>
							<li>
								<a href="faq" className="btn btn-default">
									<span className="icon"><FAQIcon size="20" /></span>
									<span className="btnLabel"> FAQ</span>
								</a>
							</li>
							<li>
								<a href="index.php?route=information/contact" className="btn btn-default">
									<span className="icon"><ContactIcon size="20" /></span>
									<span className="btnLabel"> Contact</span>
								</a>
							</li>
						</ul>
					</div>
				</Scrollbars>
			</div>
		);
	}
}

MainMenuMob.defaultProps = {
	activeItem: 0
}

export default MainMenuMob;
