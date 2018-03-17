import React, { Component } from 'react';

import CheckBox from './CheckBox';

class CheckBoxGroup1 extends Component {

	state = {
		value: []
	};

	setSelected = (val, checked) => {
		console.log(val);
		if(checked) {
			this.setState({ value: this.state.value.concat(val) });
		} else {
			let newVal = this.state.value.filter(e => { return e !== val });
			this.setState({ value: newVal });
		}
	}

	render() {
		let itms = this.props.items.map((val, key) => {
			return <CheckBox label={val.name} value={val.id} key={key} onSelect={this.setSelected} />
		});

		return (
			<div>
				{itms}
				<input type="hidden" name={this.props.valName} value={this.state.value.join("-")} />
			</div>
		);
	}
}

CheckBoxGroup1.defaultProps = {
	items: [],
	valName: 'brands'
};

export default CheckBoxGroup1;
