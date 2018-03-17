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

	return <div className="tabs">{buildTabContent(props.index)}</div>;
}

Tabs.defaultProps = {
	index: 0
};

Tabs.propTypes = {
	index: PropTypes.number
};

export default Tabs;
