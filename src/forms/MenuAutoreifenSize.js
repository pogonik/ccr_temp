import React, { Component } from 'react';

import { Tire } from '../svg/Icons';

export default class MenuFilterBySize extends Component {

	state = {
		breite: '',
		hoehe: '',
		zoll: ''
	};

	resetForm() {
		this.setState({
			breite: '',
			hoehe: '',
			zoll: ''
		});
	};

	handleInput = (name, val) => {
		this.setState({ [name]: val.value });
		this.props.onChange(name, val);
	};

	render() {
		return (
			<div id="size_form_wrapper" className="selects clearfix">
				<div id="autoreifen_sizes">
					<div className="form-group">
						<input
							type="text" name="atts[breite]"
							value={this.state.breite}
							className="form-control text breite"
							onChange={this.handleInput.bind(this, 'breite')}
							placeholder="Breite" />
						<Tire id="tire" colors={["#ff4500","#666","#666"]} />
					</div>
					<div className="form-group">
						<input
							type="text" name="atts[hoehe]"
							value={this.state.hoehe}
							className="form-control text hoehe"
							onChange={this.handleInput.bind(this, 'hoehe')}
							placeholder="Hoehe" />
						<Tire id="tire" colors={["#666","#ff4500","#666"]} />
					</div>
					<div className="form-group">
						<input
							type="text" name="atts[zoll]"
							value={this.state.zoll}
							className="form-control text zoll last"
							onChange={this.handleInput.bind(this, 'zoll')}
							placeholder="Zoll" />
						<Tire id="tire" colors={["#666","#666","#ff4500"]} />
					</div>
				</div>
			</div>
		);
	}
}
