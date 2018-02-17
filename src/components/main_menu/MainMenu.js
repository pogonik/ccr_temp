import React, { Component } from 'react';
// import { baseUrl } from '../../lib/constants';

import MainMenuLG from './MainMenuLG';
import MainMenuMob from './MainMenuMob';

export default class MainMenu extends Component {

	render() {
		if(this.props.sirina > 1200) {
			return (<MainMenuLG/>);
		} else {
			return (<MainMenuLG/>);
		}
	}
}
