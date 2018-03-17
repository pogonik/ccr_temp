import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';

// import MainMenu from './components/main_menu/MainMenu';

// import TopFilter from './components/TopFilter.js';
// import SideFilter from './components/SideFilter.js';
// import FilterByVehicleSide from './forms/FilterByVehicleSide.js';

import ResultsTeilen from './components/ResultsTeilen.js';

import { BrowserRouter as Router } from "react-router-dom";

import { getPathname } from './lib/constants';

//let cats = ['batterien','kettenkits','bremsbelaege'];
let path = getPathname();
// import createBrowserHistory from 'history/createBrowserHistory';
// import { Router } from 'react-router';

// const history = createBrowserHistory();

// window.onload = function() {
// 	console.log('window ready!');
// 	ReactDOM.render(<MainMenu sirina={window.screen.width} />, document.getElementById('main_menu_cont'));
// }

// window.addEventListener('resize', e => {
// 	console.log('resize!');
// 	ReactDOM.render(<MainMenu sirina={e.currentTarget.screen.width} />, document.getElementById('main_menu_cont'));
// });

//ReactDOM.render(<TopFilter />, document.getElementById('filter_cont'));

// ReactDOM.render(<FilterByVehicleSide />, document.querySelector('#side_filter > .clearfix'));

// if(cats.includes(path)) {
// 	ReactDOM.render(<FilterByVehicleSide />, document.querySelector('#side_filter > .clearfix'));
// }

if(document.getElementById('rezultat') && path === 'filter_teilen') {
	ReactDOM.render(<Router><ResultsTeilen /></Router>, document.getElementById('rezultat'));
}

//registerServiceWorker();

// console.log(window);
// console.log(window.location);