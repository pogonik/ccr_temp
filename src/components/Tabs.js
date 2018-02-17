import React, { PropTypes, Component } from 'react';

class Tabs extends Component {

	// static propTypes = {
	// 	index: PropTypes.number
	// };
	//
	// static defaultProps = {
	// 	index: 0
	// };

	state = {
		size: 0
	};

	constructor(props) {
		super(props);
	}

	buildTabContent(e) {
		var panel;
		this.props.children.forEach((val, key) => {
			if(e === key)
				panel =  val;
		});
		return panel;
	}

	render() {

		let style = Object.assign({
			width:'117px',
			height:'30px',
			color: '#999',
			fontFamily: 'Geogrotesque, sans-serif',
			fontWeight: 'normal',
			fontSize: '15px'
		}, this.props.style);

		return (
			<div className="tabs">
				{this.buildTabContent(this.props.index)}
			</div>
		);
	}
}

Tabs.defaultProps = {
	index: 0
};

export default Tabs;
