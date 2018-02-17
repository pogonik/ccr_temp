import React, { PropTypes, Component } from 'react';

import Selekt from 'react-select';
import Spinner from '../components/Spinner';

import { basePath, baseUrl, baseApiUrl, checkStatus, returnJSON, serialize, serialize2 } from '../lib/constants';

let options = {};

export default class FilterByVehicle extends Component {

	static propTypes = {
	};

	static defaultProps = {
	};

	state = {
		selectOptions: [],
		markaOptions: [],
		query: {},
		atts: {},
		marka: '',
		ccm: '',
		model: '',
		year: '',
		antrieb: '',
		antriebOptions: [
			{value: "front",label: "Vorderrad"},
			{value: "back",label: "Hinterrad"}
		],
		disabled: [true, true, true, true, true, true]
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.getMarkaData();
	}

	getMarkaData = () => {
		var url = baseApiUrl + 'filter/get_marka_data';
		fetch(url)
			.then(checkStatus)
			.then(returnJSON)
			.then(data => {
				this.setState({ markaOptions: data, disabled: [false, true, true, true, true, true] });
			});
	}

	getModelData() {

		// let params = $("form#vehicle_form").serialize();

		let params = serialize(document.getElementById("vehicle_form"));
		params = decodeURIComponent(params);

		document.getElementById('vehicle_form_wrapper').classList.add('loading');

		fetch(baseApiUrl + 'filter/get_model_data&'+params)
			.then(checkStatus)
			.then(returnJSON)
			.then(data => {
				if(data.hasOwnProperty('vehicle')) {
					this.setState({ selectOptions: data.vehicle }, () => {
						document.getElementById('vehicle_form_wrapper').classList.remove('loading');
					});
				} else {
					this.setState({ atts: data }, () => {
						document.getElementById('vehicle_form_wrapper').classList.remove('loading');
					});
				}

			});
	};

	handleSelect(name, val) {

		let niz = ['marka', 'ccm', 'model', 'year', 'antrieb'];

		let num = niz.indexOf(name);

		let { query, disabled } = this.state;

		if(val === null) {
			for(let i=num; i < 5; i++) {
				disabled[i+1] = true;
				Object.assign(query, { [niz[i]]: val });
			}
		} else {
			disabled[num+1] = false;
			Object.assign(query, { [name]: val.value });
		}

		this.setState({ query, disabled }, this.getModelData);
	}

	submitValues = (e) => {
		e.preventDefault();
		// let params = decodeURIComponent($.param(this.state.atts));
		let params = decodeURIComponent(serialize(this.state.atts));
		console.log(params);
		window.location = baseUrl+'filter?'+params+'&parent=49';
	};

	render() {

		let { marka, ccm, model, year, antrieb } = this.state;

		return (
			<div id="vehicle_form_wrapper" className="selects clearfix">
				<form id="vehicle_form" className="panel_width clearfix" name="vehicle">

						<div className="col-lg-12">

							<div className="row">
								<Selekt
									onChange={this.handleSelect.bind(this,'marka')}
									value={this.state.query.marka}
									name="marka"
									options={this.state.markaOptions}
									id="1" searchable={false}
									placeholder="Motorradhelsteller"
									disabled={this.state.disabled[0]}
									className="selekt" />
							</div>

							<div className="row">
								<Selekt
									onChange={this.handleSelect.bind(this,'ccm')}
									value={this.state.query.ccm}
									name="ccm"
									options={this.state.selectOptions.ccm}
									id="1" searchable={false}
									placeholder="Hubraum"
									disabled={this.state.disabled[1]}
									className="selekt" />
							</div>

							<div className="row">
								<Selekt
									onChange={this.handleSelect.bind(this,'model')}
									value={this.state.query.model}
									name="model"
									options={this.state.selectOptions.model}
									id="1" searchable={false}
									placeholder="Modell"
									disabled={this.state.disabled[2]}
									className="selekt" />
							</div>

							<div className="row">
								<Selekt
									onChange={this.handleSelect.bind(this,'year')}
									value={this.state.query.year}
									name="year"
									options={this.state.selectOptions.year}
									id="1" searchable={false}
									placeholder="Jahr"
									disabled={this.state.disabled[3]}
									className="selekt" />
							</div>

							<div className="row">
								<Selekt
									onChange={this.handleSelect.bind(this,'antrieb')}
									value={this.state.query.antrieb}
									name="antrieb"
									options={this.state.antriebOptions}
									id="1" searchable={false}
									placeholder="Antrieb"
									disabled={this.state.disabled[4]}
									className="selekt" />
							</div>

						</div>

						<input type="hidden" name="parent" value="49" />

				</form>

				<button type="submit"
					onClick={this.submitValues}
					disabled={this.state.disabled[5]}
					className="btn btn-default btn-lg btn-submit">
						Search
				</button>

				<Spinner />

			</div>
		);
	}
}
