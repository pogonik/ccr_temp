import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import MainMenu from './components/main_menu/MainMenu';

import TopFilter from './components/TopFilter.js';

ReactDOM.render(<MainMenu />, document.getElementById('main_menu_cont'));

ReactDOM.render(<TopFilter />, document.getElementById('filter_cont'));

registerServiceWorker();
