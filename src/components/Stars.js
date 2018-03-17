import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StarIcon } from '../svg/Icons';

class Stars extends Component {

	state = {
		newGrade: this.props.grade,
		stars: []
	};

	componentDidMount() {
		this.setState({ stars: this.getStars(this.props.grade) });
	}

	getStars(grade) {
		let stars = [];
		let klasa = '';
		for(let i=1; i<=5; i++) {
			if(i <= grade) {
				klasa = 'dark';
				stars.push(<a href="#" key={i} className={'star '+klasa} onClick={this.setGrade.bind(this,i)}><StarIcon size={this.props.size} /></a>);
			} else {
				klasa = 'light';
				stars.push(<a href="#" key={i} className={'star '+klasa} onClick={this.setGrade.bind(this,i)}><StarIcon size={this.props.size} /></a>);
			}
		}
		return stars;
	}

	setGrade = (num, e) => {
		e.preventDefault();
		this.setState({ stars: this.getStars(num) });
	}

	render() {
		return (
			<div className="stars">
				{this.state.stars}
			</div>
		);
	}
}

Stars.propTypes = {
	grade: PropTypes.number,
	size: PropTypes.string
};

Stars.defaultProps = {
	grade: 0,
	size: "17"
};

export default Stars;
