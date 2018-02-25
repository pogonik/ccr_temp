import React, { Component } from 'react';

import CheckBox from './CheckBox';
import { Scrollbars } from 'react-custom-scrollbars';

import { baseUrl, baseApiUrl, checkStatus, returnJSON } from '../../lib/constants';

class SideFilterGroup extends Component {

	state = {
		data: [],
		selected: [],
		checkboxes: []
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.setState({ selected: this.props.selected });
		this.getData();
	}

	componentWillUpdate(nextProps, nextState) {
		if(nextState.selected !== this.state.selected) {
			this.setState({ selected: nextState.selected });
			this.getData();
			this.props.onChange(nextState.selected);
		}
	}

	handleSelection = (val, checked) => {
		if(checked) {
			this.setState({ selected: this.state.selected.concat(val) });
		} else {
			let newVal = this.state.selected.filter(e => { return e !== val });
			this.setState({ selected: newVal });
		}
	}

	selectAll = (e) => {
		e.preventDefault();
		let selected = this.state.data.map(val => {
			if(this.props.activeItems.indexOf(val.id) !== -1)
				return val.id;
		});
		this.setState({ selected });
	}

	deselectAll = (e) => {
		e.preventDefault();
		this.setState({ selected: [] });
	}

	getData(type) {
		fetch(baseApiUrl+this.props.source, {
			method: "GET",
			credentials: "same-origin"
		}).then(checkStatus)
		.then(returnJSON)
		.then(data => {
			this.setState({ data });
		}).catch(err => {
			this.setState({ error: true });
			console.log(err);
		});
	};

	buildCheckboxes() {
		var checkboxes = this.state.data.map((val,key) => {

			if(this.props.activeItems === null || this.props.activeItems.length < 1) {
				return (<CheckBox label={val.name} active={true}
							value={val.id}
							className="right" key={key}
							checked={this.state.selected.indexOf(val.id) !== -1}
							onSelect={this.handleSelection} />);
			} else {
				if(this.props.activeItems.indexOf(val.id) !== -1) {
					return (<CheckBox label={val.name} active={true}
								value={val.id}
								className="right" key={key}
								checked={this.state.selected.indexOf(val.id) !== -1}
								onSelect={this.handleSelection} />);
				} else {
					return (<CheckBox label={val.name} active={false}
								value={val.id}
								className="right" key={key}
								checked={false}
								onSelect={() => { return false; }} />);
				}
			}

		});
		return checkboxes;
	};

	render() {
		let id = this.props.id ? this.props.id : 'side_filter_group';
		let checkBoxes = this.buildCheckboxes();
		let content = checkBoxes;

		// if(_.size(this.state.data) > 7) {
		// 	content = <Scrollbars autoHide autoHeight autoHeightMin={200} autoHeightMax={270}>
		// 		{checkBoxes}
		// 	</Scrollbars>;
		// }
		if(this.state.data.length > 7) {
			content = <Scrollbars autoHide autoHeight autoHeightMin={200} autoHeightMax={270}>
				{checkBoxes}
			</Scrollbars>;
		}

		return (
			<div className={this.props.className}>
				<h3 className="subtitle">
					<a role="button" href={'#'+this.props.id} data-toggle="collapse" data-parent="side_filter" className="collapsed">{this.props.title}</a>
				</h3>
				<form ref="marken" className="clearfix collapse" id={id}>
					{content}
					<input type="hidden" name={this.props.valName} value={this.state.selected.join("-")} />
					<a href="#" onClick={this.selectAll} className="select_all select_btn hide">SELECT ALL</a>
					<a href="#" onClick={this.deselectAll} className="deselect select_btn hide">UNSELECT ALL</a>
				</form>
			</div>
		);
	}
};

SideFilterGroup.defaultProps = {
	onChange: function() {},
	selected: [],
	activeItems: []
};

export default SideFilterGroup;
