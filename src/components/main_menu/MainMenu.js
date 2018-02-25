import React from 'react';

import MainMenuLG from './MainMenuLG';
import MainMenuMob from './MainMenuMob';

const MainMenu = props => {

	if(props.sirina > 1200) {
		return (<MainMenuLG/>);
	} else {
		return (<MainMenuMob/>);
	}
}

export default MainMenu;