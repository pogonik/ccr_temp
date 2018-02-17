import React, { Component } from 'react';

import CheckBox from './CheckBox';
import { Scrollbars } from 'react-custom-scrollbars';
// import { baseUrl, baseApiUrl, checkStatus, returnJSON } from '../../lib/constants';

class CheckBoxGroup extends Component {

	state = {
		selected: [],
		checkboxes: [],
		activeItems: null
	};

	handleSelection = (val, checked) => {
		if(this.props.activeItems === null || this.props.activeItems.indexOf(val) !== -1) {
			if(checked) {
				this.setState({ selected: this.state.selected.concat(val) }, this.props.onChange);
			} else {
				let newVal = this.state.selected.filter(e => { return e !== val });
				this.setState({ selected: newVal }, this.props.onChange);
			}
		}
	};

	selectAll = (e) => {
		e.preventDefault();
		// let selected = _.map(this.props.items, val => {
		let selected = this.props.items.map(val => {
			if(this.props.activeItems.indexOf(val.id) !== -1)
				return val.id;
		});
		this.setState({ selected }, this.props.onChange);
	}

	deselectAll = (e) => {
		e.preventDefault();
		this.setState({ selected: [] }, this.props.onChange);
	}

	buildCheckboxes() {
		var checkboxes = this.props.items.map((val,key) => {
			if(this.props.activeItems === null) {
				return (<CheckBox label={val.name} active={true}
							value={val.id}
							className="right" key={key}
							checked={false}
							onSelect={this.handleSelection} />);
			} else {
				let active = this.props.activeItems.indexOf(val.id) !== -1 ? true : false;
				return (<CheckBox label={val.name} active={active}
							value={val.id}
							className="right" key={key}
							checked={this.state.selected.indexOf(val.id) !== -1}
							onSelect={this.handleSelection} />);
			}
		});
		return checkboxes;
	};

	render() {
		let checkBoxes = this.buildCheckboxes();
		let content = checkBoxes;

		// if(_.size(this.props.items) > 7) {
		if(this.props.items.length > 7) {
			content = <Scrollbars autoHide autoHeight autoHeightMin={200} autoHeightMax={270}>
				{checkBoxes}
			</Scrollbars>;
		}

		return (
			<div>
				<div ref="marken" className="clearfix">
					{content}
					<input type="hidden" name={this.props.valName} value={this.state.selected.join("-")} />
				</div>
				<a href="#" onClick={this.selectAll} className="select_all select_btn">SELECT ALL</a>
				<a href="#" onClick={this.deselectAll} className="deselect select_btn">UNSELECT ALL</a>
			</div>
		);
	}
};

CheckBoxGroup.defaultProps = {
	items: [],
	activeItems: null
};

export default CheckBoxGroup;
