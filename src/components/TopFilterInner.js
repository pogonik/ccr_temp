import React, { Component } from 'react';

import Tabs from './Tabs';

import FilterBySize from '../forms/FilterBySize';
import FilterByVehicle from '../forms/FilterByVehicle';

import { FilterTabBtn1, FilterTabBtn2 } from '../svg/Icons';

export default class TopFilterInner extends Component {

   state = {
      activeTab: 0,
      message: ''
   };

   handleTabChange = (e, btn) => {
      document.querySelector('nav.tab_nav button.active').classList.remove('active');
      btn.currentTarget.classList.add('active');
      this.setState({ activeTab: e });
   };

   render() {
      return (
         <div className="inner">

            <nav className="tab_nav">
               <button
                  className="tab-btn tab-btn-left active"
                  ref="leftBtn"
                  onClick={this.handleTabChange.bind(this, 0)}>
                  <FilterTabBtn1 />
               </button>
               <button
                  className="tab-btn tab-btn-right"
                  ref="rightBtn"
                  onClick={this.handleTabChange.bind(this, 1)}>
                  <FilterTabBtn2 />
               </button>
            </nav>

            <Tabs index={this.state.activeTab}>

               <div className="tab_panel">
                  <FilterBySize />
               </div>

               <div className="tab_panel">
                  <FilterByVehicle />
               </div>

            </Tabs>

            {this.state.message}

         </div>
      );
   }
}
