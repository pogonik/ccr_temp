import React, { Component } from 'react';

class SvgIcon extends Component {

	render() {

		let styles = Object.assign({
			fill: "currentColor",
			verticalAlign: "middle",
			width: this.props.size + 'px',
			height: this.props.size + 'px'
		}, this.props.style);

		return (
			<svg {...this.props} preserveAspectRatio="xMidYMid meet" style={styles}>
				{this.props.children}
			</svg>
		);
	}
}

SvgIcon.defaultProps = {
	viewBox: "0 0 24 24",
	size: '24'
};

export default SvgIcon;
