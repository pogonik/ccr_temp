import React from 'react';
import PropTypes from 'prop-types';

// class Thumb2 extends Component {

// 	toggleSelected = (id, e) => {
// 		e.preventDefault();
// 		if(this.props.active) {
// 			if(this.props.checked) {
// 				this.props.onSelect(id, false);
// 			} else {
// 				this.props.onSelect(id, true);
// 			}
// 		}
// 	};

// 	render() {

// 		let klasa = 'thumb '+this.props.className;
// 		klasa = this.props.checked ? klasa+' active' : klasa;
// 		klasa = this.props.active ? klasa : klasa+' disabled';

// 		return (
// 			<div className={klasa} onClick={this.toggleSelected.bind(this, this.props.value)}>
// 				<a href="#">
// 					<img src={this.props.image} /><div className="img"></div>
// 					<div className="title">{this.props.label}</div>
// 				</a>
// 			</div>
// 		);
// 	}
// }



const Thumb2 = props => {

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


Thumb2.defaultProps = {
	checked: false,
	value: ''
};

Thumb2.propTypes = {
	active: PropTypes.bool,
	checked: PropTypes.bool,
	label: PropTypes.string,
	value: PropTypes.string
};

export default Thumb2;
