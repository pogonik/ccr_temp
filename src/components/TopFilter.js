import React, { PropTypes, Component } from 'react';

import { baseApiUrl, checkStatus, returnJSON } from '../lib/constants';

import TopFilterInner from './TopFilterInner';

import { Caret, LupaIcon1 } from '../svg/Icons';

import axios from 'axios';

export default class TopFilter extends Component {

	state = {
		open: false
	};

	constructor(props) {
		super(props);
	}

	toggleFilter = () => {
		// if(!this.state.open) {
		//    setTimeout(() => { $("#filter").css({'overflow': 'visible'}); } ,300);
		// }
		// $("#filter").removeAttr('style');
		// $("#filter").toggleClass('open');

		if(!this.state.open) {
			setTimeout(() => {
				document.getElementById('filter').style.overflow = 'visible';
			} ,300);
		}


		document.getElementById('filter').removeAttribute('style');
		document.getElementById('filter').classList.toggle('open');

		this.setState({ open: !this.state.open });
	};

	render() {
		
		return (
			<div id="filter" className="">
				<button className="btn btn-default btn-lg btn-block btn-filter" onClick={this.toggleFilter}>
					<LupaIcon1 size="18" className="lupa_icon" />
					Reifengrosse
					<Caret className="dole" />
					<Caret className="gore" />
				</button>
				<TopFilterInner />
			</div>
		);
	}
}
