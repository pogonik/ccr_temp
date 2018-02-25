import React from 'react';
import PropTypes from 'prop-types';

const Tabs = props => { 

	const buildTabContent = (e) => {
		var panel;
		props.children.forEach((val, key) => {
			if(e === key)
				panel =  val;
		});
		return panel;
	}

	let style = Object.assign({
		width:'117px',
		height:'30px',
		color: '#999',
		fontFamily: 'Geogrotesque, sans-serif',
		fontWeight: 'normal',
		fontSize: '15px'
	}, props.style);

	return (
		<div className="tabs">
			{buildTabContent(props.index)}
		</div>
	);
}

Tabs.defaultProps = {
	index: 0
};

Tabs.propTypes = {
	index: PropTypes.number
};

export default Tabs;
