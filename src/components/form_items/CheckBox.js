import React, { Component } from 'react';

import { CheckBoxIcon } from '../../svg/Icons';

class CheckBox extends Component {

	state = {
		checked: this.props.checked
	};

	componentWillReceiveProps(nextProps) {
		if(nextProps.checked !== this.props.checked) {
			this.setState({ checked: nextProps.checked });
		}
	}

	toggleCheckBox = (id) => {
		this.setState({ checked: !this.state.checked }, () => {
			this.props.onSelect(this.props.value, this.state.checked)
		});
	};

	render() {

		let klasa = 'checkbox '+this.props.className;
		if(this.state.checked)
			klasa += ' checked';

		let content = (
			<label onClick={this.toggleCheckBox.bind(null, this.props.value)}>
				<span>{this.props.label}</span>
				<CheckBoxIcon checked={this.props.checked} />
			</label>
		);

		if(!this.props.active) {
			klasa += ' disabled';
			content = (
				<label onClick={() => { return false; }}>
					<span>{this.props.label}</span>
					<CheckBoxIcon checked={this.props.checked} />
				</label>
			);
		}

		return (
			<div className={klasa}>{content}</div>
		);
	}
}
CheckBox.defaultProps = {
	checked: false,
	value: '',
	active: true
};
export default CheckBox;
