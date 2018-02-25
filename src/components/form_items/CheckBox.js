import React from 'react';
import PropTypes from 'prop-types';

import { CheckBoxIcon } from '../../svg/Icons';

const CheckBox = props => {

	const toggleCheckBox = (e) => {
		props.onSelect(props.value, !props.checked)
	};

	let klasa = 'checkbox '+props.className;
	if(props.checked)
		klasa += ' checked';

	let content = (
		<label onClick={toggleCheckBox}>
			<span>{props.label}</span>
			<CheckBoxIcon checked={props.checked} />
		</label>
	);

	if(!props.active) {
		klasa += ' disabled';
		content = (
			<label>
				<span>{props.label}</span>
				<CheckBoxIcon checked={props.checked} />
			</label>
		);
	}

	return (
		<div className={klasa}>{content}</div>
	);

}

CheckBox.defaultProps = {
	checked: false,
	value: '',
	active: true
};

CheckBox.propTypes = {
	active: PropTypes.bool,
	checked: PropTypes.bool,
	label: PropTypes.string,
	value: PropTypes.string,
};

export default CheckBox;
