import React, { Component } from 'react';

import Thumb from './Thumb2';

import { baseUrl } from '../../lib/constants';

class ThumbsGroup extends Component {

	state = {
		value: []
	};

	setSelected = (val, checked, e) => {
		if(checked) {
			this.setState({ value: val }, this.props.onChange);
		} else {
			this.setState({ value: '' }, this.props.onChange);
		}
	}

	buildThumbs(items) {
		// let thumbs = _.map(items, (v,k) => {
		let thumbs = items.map((v,k) => {

			if(this.props.activeItems === null) {
				let check = false;
				if(this.state.value === v.id) {
					check = true;
				}
				return <Thumb image={baseUrl+'image/'+v.image} checked={check} label={v.name} value={v.id} key={k} onSelect={this.setSelected} active={true} />
			} else {
				let active = this.props.activeItems.indexOf(v.id) !== -1 ? true : false;
				let check = false;
				if(this.state.value === v.id) {
					check = true;
				}
				return <Thumb image={baseUrl+'image/'+v.image} checked={check} label={v.name} value={v.id} key={k} onSelect={this.setSelected} active={active} />
			}

		});
		return thumbs;
	}

	render() {

		let itms1 = this.buildThumbs(this.props.items1);
		let itms2 = this.buildThumbs(this.props.items2);

		return (


			<div className="col-2">

				<div className="row">
					<h3 className="subtitle">Teilen</h3>
					<div className="thumbs">{itms1}</div>
				</div>

				<div className="row">
					<h3 className="subtitle" style={{margin:'30px 0'}}>Zubehör</h3>
					<div className="thumbs">{itms2}</div>
				</div>

				<input type="hidden" name={this.props.valName} value={this.state.value} />

			</div>

		);
	}
}

ThumbsGroup.defaultProps = {
	items1: [],
	items2: [],
	valName: 'typs'
};

export default ThumbsGroup;
