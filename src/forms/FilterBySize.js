import React, { Component } from 'react';
// import { Router, Route, browserHistory, withRouter } from 'react-router';

import Select from 'react-select';

import { Tire } from '../svg/Icons';

import { baseUrl, baseApiUrl, checkStatus, returnJSON, serialize } from '../lib/constants';

class FilterBySize extends Component {

	state = {
		selectOptions: [],
		selectBreite: [],
		selectHoehe: [],
		selectZoll: [],
		breite: null,
		hoehe: null,
		zoll: null,
		width: null,
		aspect: null,
		rim: null,
		tireColors: ['#666', '#666', '#666'],
		activeForm: 'choose_form',
		disabledBreite: false,
		disabledHoehe: true,
		disabledZoll: true,
		test: []
	};

	componentWillMount() {
		this.getSelectData();
	}

	getTestData(params) {
		fetch(baseApiUrl+'filter/get_attributes&wanted=atts&parent=49&'+params, {credentials: "same-origin"})
			.then(checkStatus)
			.then(returnJSON)
			.then(data => {
				this.setState({
					selectHoehe: data.hoehe,
					selectZoll: data.zoll
				});
			});
	};

	getSelectData = () => {
		fetch(baseApiUrl+'filter/get_attributes&wanted=atts&parent=49', {credentials: "same-origin"})
			.then(checkStatus)
			.then(returnJSON)
			.then(data => {
				this.setState({
					selectBreite: data.breite,
					selectHoehe: data.hoehe,
					selectZoll: data.zoll
				});
			});
	};

	handleInput = (name, val) => {
		this.setState({ [name]: val.value });
	};

	handleFocus = (e, form) => {
		var colors = [];
		for(var i = 0; i < 3; i++) {
			colors[i] = '#666';
			if(i === e) {
				colors[i] = '#ff4500';
			}
		}
		this.setState({ tireColors: colors, activeForm: form });
	};

	submitValues = (e) => {
		e.preventDefault();
		// let formParams = $("#"+this.state.activeForm).serialize();
		let formParams = serialize(document.getElementById(this.state.activeForm));
		window.location = baseUrl+'filter?'+decodeURIComponent(formParams);
	};

	handleSelect = (name, val) => {

		let query = {};
		let { breite, hoehe } = this.state;

		if(name === 'breite') {
			query = {'atts':{ 'breite':val.value }};
			this.setState({ [name]: val.value, disabledHoehe:false, disabledZoll:true });
		} else if(name === 'hoehe') {
			query = {'atts':{ 'breite':breite,'hoehe':val.value }};
			this.setState({ [name]: val.value, disabledZoll:false });
		} else {
			query = {'atts':{ 'breite':breite,'hoehe':hoehe,'zoll':val.value }};
			this.setState({ [name]: val.value });
		}

		let params = ``
		// let params = decodeURIComponent($.param(query));

		let num = 0;
		for (var key in query.atts) {
			if(query.atts[key]) {
				params += num !== 0 ? `&` :  '';
				params += `atts[${key}]=${query.atts[key]}`
			}
			num++;
		}
		console.log(params);
		// let params = decodeURIComponent(serialize(query));
		// console.log(params);
		this.getTestData(decodeURIComponent(params));

	};

	render() {

		return (
			<div>

				<div className="label">I know my tyre size</div>

				<div id="know_form_wrapper" ref="knowForm" className="clearfix">
					<form id="know_form" name="know">
						<div className="form-group">
							<input
								type="text" name="atts[breite]"
								className="form-control"
								onFocus={this.handleFocus.bind(this, 0, 'know_form')}
								onChange={this.handleInput.bind(this, 'width')}
								placeholder="Width" />
						</div>
						<div className="form-group">
							<input
								type="text" name="atts[hoehe]"
								className="form-control"
								onFocus={this.handleFocus.bind(this, 1, 'know_form')}
								onChange={this.handleInput.bind(this, 'aspect')}
								placeholder="Aspect" />
						</div>
						<div className="form-group">
							<input
								type="text" name="atts[zoll]"
								className="form-control last"
								onFocus={this.handleFocus.bind(this, 2, 'know_form')}
								onChange={this.handleInput.bind(this, 'rim')}
								placeholder="Rim" />
						</div>
						<input type="hidden" name="parent" value="49" />
					</form>
				</div>

				{<Tire id="tire" colors={this.state.tireColors} />}

				<div className="label">Or choose below</div>

				<div id="choose_form_wrapper" ref="chooseForm" className="selects clearfix">
					<form id="choose_form" name="choose" method="GET" action={baseUrl+'filter'}>
						<Select
							onChange={this.handleSelect.bind(this, 'breite')}
							onFocus={this.handleFocus.bind(this, 0, 'choose_form')}
							value={this.state.breite}
							options={this.state.selectBreite}
							searchable={false} clearable={false}
							placeholder="Width" name="atts[breite]"
							disabled={this.state.disabledBreite} className="selekt" />
						<Select
							onChange={this.handleSelect.bind(this, 'hoehe')}
							onFocus={this.handleFocus.bind(this, 1, 'choose_form')}
							value={this.state.hoehe}
							options={this.state.selectHoehe}
							searchable={false} clearable={false}
							placeholder="Aspect" name="atts[hoehe]"
							disabled={this.state.disabledHoehe} className="selekt" />
						<Select
							onChange={this.handleSelect.bind(this, 'zoll')}
							onFocus={this.handleFocus.bind(this, 2, 'choose_form')}
							value={this.state.zoll}
							options={this.state.selectZoll}
							searchable={false} clearable={false}
							name="atts[zoll]" placeholder="Rim"
							disabled={this.state.disabledZoll} className="selekt selekt-last" />

						<input type="hidden" name="parent" value="49" />
					</form>
				</div>

				<button
					type="submit"
					onClick={this.submitValues}
					className="btn btn-default btn-block btn-submit">
						Search
				</button>

			</div>
		);
	}
}



export default FilterBySize;
