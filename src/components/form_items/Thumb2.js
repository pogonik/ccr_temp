import React, { Component } from 'react';

class Thumb2 extends Component {

	state = {
		checked: this.props.checked
	};

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ checked: nextProps.checked });
	}

	toggleSelected = (id, e) => {
		e.preventDefault();
		if(this.props.active) {
			if(this.state.checked) {
				this.props.onSelect(id, false);
			} else {
				this.props.onSelect(id, true);
			}
		}
	};

	render() {

		let klasa = 'thumb '+this.props.className;
		// if(this.state.checked)
		//    klasa = klasa+' active';
		klasa = this.state.checked ? klasa+' active' : klasa;
		klasa = this.props.active ? klasa : klasa+' disabled';

		return (
			<div className={klasa} onClick={this.toggleSelected.bind(this, this.props.value)}>
				<a href="#">
					<img src={this.props.image} /><div className="img"></div>
					<div className="title">{this.props.label}</div>
				</a>
			</div>
		);
	}
}

Thumb2.defaultProps = {
	checked: false,
	value: ''
};

export default Thumb2;
