import React from 'react';
import PropTypes from 'prop-types';

const Thumb = props => {

	const toggleSelected = (e) => {
		e.preventDefault();
		if(props.active) {
			if(props.checked) {
				props.onSelect(props.value, false);
			} else {
				props.onSelect(props.value, true);
			}
		}
	};

	let klasa = 'thumb '+props.className;
	klasa = props.checked ? klasa+' active' : klasa;
	klasa = props.active ? klasa : klasa+' disabled';

	return (
		<div className={klasa} onClick={toggleSelected}>
			<a href="#">
				<img src={props.image} /><div className="img"></div>
				<div className="title">{props.label}</div>
			</a>
		</div>
	);
}

Thumb.defaultProps = {
	checked: false,
	value: ''
};

Thumb.propTypes = {
	active: PropTypes.bool,
	checked: PropTypes.bool,
	label: PropTypes.string,
	value: PropTypes.string
};

export default Thumb;
