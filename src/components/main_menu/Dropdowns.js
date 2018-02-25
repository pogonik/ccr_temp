import React, { Component } from 'react';
// import { Router, Route, Link, browserHistory } from 'react-router';

// import DropdownItem from './DropdownItem';
// import CheckBox from '../form_items/CheckBox';
import CheckBoxGroup from '../form_items/CheckBoxGroup';
import ThumbsGroup from '../form_items/ThumbsGroup';
import ThumbsGroupMulti from '../form_items/ThumbsGroupMulti';
import MenuAutoreifenSize from '../../forms/MenuAutoreifenSize';
import ReifenForm from '../../forms/ReifenForm';
import Spinner from '../Spinner';
// import Stars from '../Stars';

import { basePath, baseUrl, baseApiUrl, checkStatus, returnJSON, validateEmail, serialize } from '../../lib/constants';

import anime from 'animejs';

export class Dropdown1 extends Component {

	state = {
		typs: [],
		brands: [],
		atts: {
			breite:null,
			hoehe:null,
			zoll:null
		},
		thumbs: [],
		activeBrands: null,
		activeTyps: null,
		params: '',
		loading: true
	};

	componentDidMount() {
		this.getData();
	}

	getData() {
		fetch(baseApiUrl+'menu&parent=49', {credentials: "same-origin"})
		.then(checkStatus).then(returnJSON)
		.then(data => {
			this.setState({ typs: data.cats, brands: data.brands });
		});

		fetch(baseApiUrl+'filter/get_options&wanted=atts&parent=49', {credentials: "same-origin"})
		.then(checkStatus).then(returnJSON)
		.then(data => {
			let atts = { breite: data.breite, hoehe: data.hoehe, zoll: data.zoll }
			this.setState({ atts, loading: false });
		});
	}

	getTestData = () => {
		this.setState({ loading: true });
		let params = serialize(document.getElementById('dd1'));
		// params = decodeURIComponent(params);
		// let options = {brands:'activeBrands', typs:'activeTyps', atts: 'atts'};
		let optionsKeys = ['brands', 'typs', 'atts'];
		let optionsVals = ['activeBrands', 'activeTyps', 'atts'];

		optionsKeys.forEach((opt,i) => {

			fetch(baseApiUrl+'filter/get_attributes&wanted='+opt+'&'+params, {credentials: "same-origin"})
			.then(checkStatus).then(returnJSON)
			.then(data => {
				if(opt === 'atts')
					this.setState({ [optionsVals[i]]: data, loading: false });
				else {
					this.setState({ [optionsVals[i]]: data });
				}
			}).catch(err => {
				this.setState({ error: true });
				console.log(err);
			});
		});

		// options.map((val,key) => {
		//
		// 	fetch(baseApiUrl+'filter/get_attributes&wanted='+key+'&'+params, {credentials: "same-origin"})
		// 	.then(checkStatus).then(returnJSON)
		// 	.then(data => {
		// 		if(key === 'atts')
		// 			this.setState({ [val]: data, loading: false });
		// 		else {
		// 			this.setState({ [val]: data });
		// 		}
		// 	}).catch(err => {
		// 		this.setState({ error: true });
		// 		console.log(err);
		// 	});
		// });
	}

	submitValues = (e) => {
		e.preventDefault();
		// let params = $("form#dd1").serialize();

		//let params = new FormData(document.getElementById('dd1'));
		let params = serialize(document.getElementById('dd1'));
		//console.log(baseUrl+'filter?' +decodeURIComponent(params));
		//window.location = baseUrl+'filter?' + decodeURIComponent(params);
		window.location = baseUrl+'filter?' +decodeURIComponent(params);
	};

	render() {
		let spinner = this.state.loading ? <Spinner /> : null;
		let klasa = this.state.loading ? 'clearfix loading_form' : 'clearfix';

		return (
			<div id="dropdown_1" className="dropdown-body clearfix">
				<form method="get" action={baseUrl+'filter'} id="dd1" className={klasa}>

					<div className="col-lg-2 marken">
						<h3 className="subtitle">Marken</h3>
						<CheckBoxGroup valName="brands"
							activeItems={this.state.activeBrands}
							onChange={this.getTestData.bind(this)}
							items={this.state.brands} />
					</div>

					<div className="col-lg-6 col-2">
						<h3 className="subtitle">Typ</h3>
						<ThumbsGroupMulti ref="thumbsGroup"
							activeItems={this.state.activeTyps}
							onChange={this.getTestData.bind(this)}
							items={this.state.typs} />
					</div>

					<div className="col-lg-4 col-3">
						<h3 className="subtitle">Reifengrosse</h3>
						<ReifenForm ref="reifenForm"
							onChange={this.getTestData.bind(this)}
							options={this.state.atts} />
						<input type="hidden" name="parent" value="49" />
						<button type="submit"
							onClick={this.submitValues}
							className="btn btn-default btn-lg btn-submit">Suchen</button>
					</div>

				</form>
				{spinner}
			</div>
		);
	}
};

export class Dropdown2 extends Component {

	state = {
		brands:[],
		teilen:[],
		zubehor:[],
		thumbs: [],
		selectedBrands: [],
		activeBrands: null,
		activeTyps: null,
		loading: true
	};

	componentDidMount() {
		this.getData();
	}

	getData() {
		fetch(baseApiUrl+'menu&parent=65,76,77', {credentials: "same-origin"})
		.then(checkStatus).then(returnJSON)
		.then(data => {
			this.setState({ brands: data.brands });
		});

		fetch(baseApiUrl+'menu/teilen&parent=76', {credentials: "same-origin"})
		.then(checkStatus).then(returnJSON)
		.then(data => {
			this.setState({ teilen: data.cats });
		});

		fetch(baseApiUrl+'menu/teilen&parent=77', {credentials: "same-origin"})
		.then(checkStatus).then(returnJSON)
		.then(data => {
			this.setState({ zubehor: data.cats, loading: false });
		});
	}

	getTestData() {
		this.setState({ loading: true });
		let brands = document.querySelector("form#dd2 input[name=brands]").value;
		let typs = document.querySelector("form#dd2 input[name=typs]").value;
		let params = decodeURIComponent('&brands='+brands+'&typs='+typs+'&parent=65,76,77');

		let options = {brands:'activeBrands', typs:'activeTyps'};


		fetch(baseApiUrl+'filter/get_attributes&wanted=brands'+params, {credentials: "same-origin"})
		.then(checkStatus).then(returnJSON)
		.then(data => {
			this.setState({ activeBrands: data });
		}).catch(err => {
			this.setState({ error: true });
			console.log(err);
		});


		fetch(baseApiUrl+'filter/get_attributes&wanted=typs'+params, {credentials: "same-origin"})
		.then(checkStatus).then(returnJSON)
		.then(data => {
			this.setState({ activeTyps: data, loading: false });
		}).catch(err => {
			this.setState({ error: true });
			console.log(err);
		});



		// options.map((val,key) => {
		//
		// 	fetch(baseApiUrl+'filter/get_attributes&wanted='+key+params, {credentials: "same-origin"})
		// 	.then(checkStatus).then(returnJSON)
		// 	.then(data => {
		// 		if(key === 'typs')
		// 			this.setState({ [val]: data, loading: false });
		// 		else {
		// 			this.setState({ [val]: data });
		// 		}
		// 	}).catch(err => {
		// 		this.setState({ error: true });
		// 		console.log(err);
		// 	});
		// });
	}

	submitValues = (e) => {
		e.preventDefault();

		let brands = document.querySelector("form#dd2 input[name=brands]").value;
		let typs = document.querySelector("form#dd2 input[name=typs]").value;

		let formParams = 'brands='+brands+'&typs='+typs+'&parent=65,76,77';
		formParams = decodeURIComponent(formParams);

		window.location = baseUrl+'filter?'+formParams;
	};

	render() {
		let spinner = this.state.loading ? <Spinner /> : '';
		let klasa = this.state.loading ? 'clearfix loading_form' : 'clearfix';
		return (
			<div id="dropdown_2" className="dropdown-body">
				<form method="get" action={baseUrl+'filter'} id="dd2" className={klasa}>
					<div className="col-lg-2 marken">
						<h3 className="subtitle">Marken</h3>
						<CheckBoxGroup valName="brands"
							activeItems={this.state.activeBrands}
							onChange={this.getTestData.bind(this)}
							items={this.state.brands} />
					</div>

					<ThumbsGroup ref="thumbsGroup1"
						activeItems={this.state.activeTyps}
						items1={this.state.teilen}
						items2={this.state.zubehor}
						onChange={this.getTestData.bind(this)}
						valName="typs" />

					<div className="text-center">
						<button type="submit"
							onClick={this.submitValues.bind(this)}
							className="btn btn-default btn-lg btn-submit">Suchen</button>
					</div>
				</form>
				{spinner}
			</div>
		);
	}
}

export class Dropdown3 extends Component {

	state = {
		brandsOptions: [
			{ id: 'Dunlop', name: 'Dunlop' },
			{ id: 'Michelin', name: 'Michelin' },
			{ id: 'Continental', name: 'Continental' },
			{ id: 'Pirelli', name: 'Pirelli' },
			{ id: 'Firestone', name: 'Firestone' },
			{ id: 'Nokian', name: 'Nokian' }
		],
		atts: [],
		selectedBrands: [], errorFields: [],
		slide: 1, breite: '', hoehe: '', zoll: '', brands: '', name: '', phone: '', email: ''
	};

	validateForm() {

		let errorFields = [];

		if(document.querySelectorAll('#inquiry_form .error'))
			document.querySelectorAll('#inquiry_form .error').classList.remove('error');

		let states = ['breite', 'hoehe', 'zoll', 'brands'];
		if(this.state.slide === 2) {
			states = ['name', 'phone', 'email'];
		}

		let valid = true;
		let mail = true;

		states.map(key => {
			if(this.state[key] === null || this.state[key] === '') {
				errorFields.push(key);
				document.querySelector('#size_form .'+key).classList.add('error');
				this.setState({ errorFields });
				valid = false;
			}
			if(this.state.slide === 2 && key === 'email' && errorFields.indexOf('email') === -1 && validateEmail(this.state[key]) === false) {
				errorFields.push('email');
				document.querySelector('#size_form .email').classList.add('error');
				this.setState({ errorFields });
				mail = false;
			}
		});

		if(!valid) {
			// toastr.info('All fields are required!');
			return false;
		} else if(!mail) {
			// toastr.info('Email address is incorrect!');
			return false;
		} else {
			return true;
		}
	}

	handleCheckChange = () => {
		let brands = this.refs.brandsGroup.state.selected.join(',');
		this.checkFieldForError('brands', brands);
		this.setState({ brands });
	}

	handleInput = (name, val) => {
		this.checkFieldForError(name, val.target.value);
		this.setState({ [name]: val.target.value });
	}

	nextSlide = (e) => {
		e.preventDefault();
		if(this.validateForm()) {

			anime({
				targets: '#dropdown_4 .contact_info',
				left: 0,
				// easing: [10, 5],
				easing: 'linear',
				duration: 750
			});

			this.setState({ slide: 2 });
		}
	}

	checkFieldForError(name, val) {
		if(val !== null && this.state.errorFields.indexOf(name) !== -1) {
			let { errorFields } = this.state;



			//this.setState({ errorFields: _.without(errorFields, name) });



			document.querySelector('#size_form .'+name).classList.remove('error');
		}
	}

	submitValues = (e) => {
		e.preventDefault();

		if(this.validateForm()) {

			let forma = document.getElementById('size_form');
			let formData = new FormData(forma);

			fetch(basePath+'index.php?route=api/autoreifen', {
				credentials: "same-origin",
				method: 'POST',
				body: formData
			})
			.then(checkStatus).then(returnJSON)
			.then(data => {
				if(data) {
					//toastr.info('Thank you for your interest.<br/>Your message has been succesfully sent!');
					document.dispatchEvent(new MouseEvent('click'));
				}
			});

		}

	};

	render() {
		let spinner = this.state.loading ? <Spinner /> : '';
		let klasa = this.state.loading ? 'clearfix loading_form' : 'clearfix';
		return (
			<div id="dropdown_4" className="dropdown-body">
				<form id="size_form" name="autoreifen" action={basePath+'index.php?route=api/autoreifen'} method="POST" className="clearfix">
					<div className="col-lg-2 marken">
						<h3 className="subtitle">Marken</h3>

						<CheckBoxGroup ref="brandsGroup" valName="brands"
							activeItems={null}
							onChange={this.handleCheckChange.bind(this)}
							items={this.state.brandsOptions} />
					</div>

					<div className="col-2">
						<h3 className="subtitle">Size</h3>

						<MenuAutoreifenSize
							onChange={this.handleInput.bind(this)}
							ref="autoreifenForm" />

						<button type="button"
							onClick={this.nextSlide.bind(this)}
							className="btn btn-default btn-lg btn-submit">Offerte Anfordern
						</button>
					</div>


					<div className="contact_info">
						<div className="inner">
							<h3 className="subtitle">Your contact info</h3>
							<div className="form-group clearfix">
								<input type="text" name="name"
									value={this.state.name}
									onChange={this.handleInput.bind(this,'name')}
									placeholder="Name and Lastname" className="form-control name text" />
							</div>
							<div className="form-group clearfix">
								<input type="text" name="phone"
									value={this.state.phone}
									onChange={this.handleInput.bind(this,'phone')}
									placeholder="Phone" className="form-control phone text" />
							</div>
							<div className="form-group clearfix">
								<input type="email" name="email"
									value={this.state.email}
									onChange={this.handleInput.bind(this,'email')}
									placeholder="Email" className="form-control email text" />
							</div>
							<div className="form-group">
								<button type="submit"
									onClick={this.submitValues.bind(this)}
									className="btn btn-default btn-lg btn-submit">Suchen</button>
							</div>
						</div>
					</div>

				</form>
			</div>
		);
	}
};

export class Dropdown4 extends Component {

	state = {
		mapa: false
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="dropdown_5" className="dropdown-body clearfix">
				<div className="col-1">
					<h3 className="subtitle">INFORMATIONEN</h3>
					<ul>
						<li><a href={baseUrl+'AGB'}>AGB</a></li>
						<li><a href={baseUrl+'zahlungsinformationen'}>Zahlungsmöglichkeiten</a></li>
						<li><a href={baseUrl+'index.php?route=account/return'}>Rücksendung</a></li>
						<li><a href={baseUrl+'index.php?route=information/sitemap'}>Site-Map</a></li>
						<li><a href={baseUrl+'faq'}>Fragen & Antworten</a></li>
						<li><a href={baseUrl+'ihre-sicherheit'}>Ihre Sicherheit</a></li>
						<li><a href={baseUrl+'datenschutz-und-cookies'}>Datenschutz und Cookies</a></li>
					</ul>
				</div>
				<div className="col-2">
					<h3 className="subtitle">Öffnungszeit</h3>
					<p><b>Montag bis Freitag</b></p>
					<p><span className="icon clock1"></span>8:00 - 19:00</p>
					<p><b>Samstags</b></p>
					<p><span className="icon clock2"></span>9:00 - 15:00</p>
				</div>
				<div className="col-3">
					<h3 className="subtitle last">Nehmen sie kontakt mit uns</h3>
					<p><span className="icon map"></span>Dammstrasse 18, 8112 Otelfingen</p>
					<p><span className="icon mail"></span>office@ccracing.ch</p>
					<p><span className="icon phone"></span>Tel: +41 (0) 44 820 30 20</p>
					<p><span className="icon mob"></span>Mobile: +41 (0) 76 370 66 65</p>
				</div>
				<a href="uber-uns#about_map" className="map_btn">Find us on map</a>
			</div>
		);
	}
};
