import React from 'react';
import PropTypes from 'prop-types';

const SvgIcon = props => {

	let styles = Object.assign({
		fill: "currentColor",
		verticalAlign: "middle",
		width: props.size + 'px',
		height: props.size + 'px'
	}, props.style);

	return (
		<svg {...props} preserveAspectRatio="xMidYMid meet" style={styles}>
			{props.children}
		</svg>
	);
}

SvgIcon.defaultProps = {
	viewBox: "0 0 24 24",
	size: '24'
};

SvgIcon.propTypes = {
	viewBox: PropTypes.string,
	size: PropTypes.string
};

export default SvgIcon;
