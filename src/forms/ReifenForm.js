import React, { Component } from 'react';

import Select from 'react-select';

import { baseApiUrl, checkStatus, returnJSON } from '../lib/constants';

var selected = {};

export default class ReifenForm extends Component {

	state = {
		selectOptions: [],
		selectBreite: [],
		selectHoehe: [],
		selectZoll: [],
		disabledBreite: true,
		disabledHoehe: true,
		disabledZoll: true,
		breite: null,
		hoehe: null,
		zoll: null,
		test: [],
		loaded: false
	};

	componentDidMount() {
		this.getSelectData();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.options !== this.props.options) {
			this.setState({
				selectBreite: nextProps.options.breite,
				selectHoehe: nextProps.options.hoehe,
				selectZoll: nextProps.options.zoll
			});
		}
	}

	getSelectData = () => {
		var url = baseApiUrl + 'filter/get_attributes&wanted=atts&parent=49';
		fetch(url, {credentials: "same-origin"})
			.then(checkStatus)
			.then(returnJSON)
			.then(data => {
				this.setState({
					selectBreite: data.breite,
					selectHoehe: data.hoehe,
					selectZoll: data.zoll,
					disabledBreite: false,
					loaded: true
				});
			});
	};


	handleSelect = (name, val) => {

		let vrednost = val === null ? null : val.value;

		if(name === 'breite') {
			this.setState({ [name]: vrednost, disabledHoehe:false, disabledZoll:true }, this.props.onChange);
		} else if(name === 'hoehe') {
			this.setState({ [name]: vrednost, disabledZoll:false }, this.props.onChange);
		} else {
			this.setState({ [name]: vrednost }, this.props.onChange);
		}
	};

	render() {

		return (
			<div id="vehicle_form_wrapper" className="selects clearfix">
				<Select
					onChange={this.handleSelect.bind(this, 'breite')}
					value={this.state.breite}
					options={this.state.selectBreite}
					id="1" searchable={false} clearable={true}
					name="atts[breite]"
					disabled={this.state.disabledBreite}
					placeholder="Breite"
					className="selekt" />

				<Select
					onChange={this.handleSelect.bind(this, 'hoehe')}
					value={this.state.hoehe}
					options={this.state.selectHoehe}
					id="2" searchable={false} clearable={true}
					name="atts[hoehe]"
					disabled={this.state.disabledHoehe}
					placeholder="Hoehe"
					className="selekt" />

				<Select
					onChange={this.handleSelect.bind(this, 'zoll')}
					value={this.state.zoll}
					options={this.state.selectZoll}
					id="3" searchable={false} clearable={true}
					name="atts[zoll]"
					disabled={this.state.disabledZoll}
					placeholder="Zoll"
					className="selekt" />
			</div>
		);
	}
}
