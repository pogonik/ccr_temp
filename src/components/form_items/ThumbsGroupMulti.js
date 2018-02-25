import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Thumb from './Thumb';

import { baseUrl } from '../../lib/constants';

class ThumbsGroupMulti extends Component {

	state = {
		value: []
	};

	// constructor(props) {
	// 	super(props);
	// }

	setSelected = (val, checked, e) => {
		if(this.props.activeItems === null || this.props.activeItems.indexOf(val) !== -1) {
			if(checked) {
				this.setState({ value: this.state.value.concat(val) }, this.props.onChange);
			} else {
				let newVal = this.state.value.filter(e => { return e !== val });
				this.setState({ value: newVal }, this.props.onChange);
			}
		}
	}

	buildThumbs() {
		// let thumbs = _.map(this.props.items, (val,key) => {
		let thumbs = this.props.items.map((val,key) => {

			if(this.props.activeItems === null) {
				return (<Thumb key={key}
							active={true}
							checked={this.state.value.includes(val.id) ? true : false}
							label={val.name}
							value={val.id}
							image={baseUrl+'image/'+val.image}
							onSelect={this.setSelected} />);
			} else {
				let active = this.props.activeItems.indexOf(val.id) !== -1 ? true : false;
				return (<Thumb key={key}
							active={active}
							checked={this.state.value.includes(val.id) ? true : false}
							label={val.name}
							value={val.id}
							image={baseUrl+'image/'+val.image}
							onSelect={this.setSelected} />);
			}

		});
		return thumbs;
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.state.value !== nextState.value)
			return true;

		if(this.props.items !== nextProps.items)
			return true;

		if(this.props.activeItems !== nextProps.activeItems)
			return true;

		return false;
	}

	render() {

		let val = this.state.value.join("-");

		return (
			<div ref="typs" className="thumbs clearfix">
				{this.buildThumbs()}
				<input type="hidden" name={this.props.valName} value={val} />
			</div>
		);
	}
}

ThumbsGroupMulti.defaultProps = {
	activeItems: [],
	items: [],
	valName: 'typs'
};

ThumbsGroupMulti.propTypes = {
	activeItems: PropTypes.array,
	items: PropTypes.array,
	onChange: PropTypes.func,
	valName: PropTypes.string
};

export default ThumbsGroupMulti;
