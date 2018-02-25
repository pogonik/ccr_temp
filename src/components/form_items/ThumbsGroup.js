import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Thumb from './Thumb';

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
				let checked = false;
				if(this.state.value === v.id) {
					checked = true;
				}
				return (
					<Thumb key={k}
						image={baseUrl+'image/'+v.image} 
						checked={checked} 
						label={v.name} 
						value={v.id} 
						onSelect={this.setSelected} 
						active={true} />
					);
			} else {
				let active = this.props.activeItems.indexOf(v.id) !== -1 ? true : false;
				let checked = false;
				if(this.state.value === v.id) {
					checked = true;
				}
				return (
					<Thumb key={k} 
						image={baseUrl+'image/'+v.image} 
						checked={checked} label={v.name} 
						value={v.id} 
						onSelect={this.setSelected} 
						active={active} />
					);
			}

		});
		return thumbs;
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.state.value !== nextState.value)
			return true;

		if(this.props.items1 !== nextProps.items1)
			return true;

		if(this.props.items2 !== nextProps.items2)
			return true;

		if(this.props.activeItems !== nextProps.activeItems)
			return true;

		return false;
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
	activeItems: [],
	items1: [],
	items2: [],
	valName: 'typs'
};

ThumbsGroup.propTypes = {
	activeItems: PropTypes.array,
	items1: PropTypes.array,
	items2: PropTypes.array,
	onChange: PropTypes.func,
	valName: PropTypes.string
};

export default ThumbsGroup;
