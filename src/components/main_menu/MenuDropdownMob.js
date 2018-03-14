import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { Dropdown1, Dropdown2, Dropdown3, Dropdown4 } from './Dropdowns';

import anime from 'animejs';

class MenuDropdownMob extends Component {

   // thumbsHeight() {
   // 	console.log('thumbs');
   // 	let thumbs = document.querySelectorAll("#mob_dropdown_wrapper .dropdown .thumbs > .thumb");
   // 	console.log(thumbs);

   // 	thumbs.forEach(thumb => {
   // 		console.log(thumb);
   // 		let sirina = thumb.offsetWidth;
   // 		thumb.style.height = sirina/1.2;
   // 	});
   // }

   componentWillReceiveProps(nextProps) {
      if(nextProps.active) {
      	document.getElementById(this.props.id).style.left = window.screen.width + 'px';
      	anime({
	      	targets: '#'+this.props.id,
	      	left:0,
	         easing: [.91,-0.54,.29,1.56],
	         duration: 750,
	         complete: el => {

	         },
	         // begin: el => {
	         // 	this.refs.wrapper.style.height = '100%';
          //      this.refs.wrapper.style.left = window.screen.width.toString()+'px';
	         // }
	      });
      }
      
   }

   drops(e) {
      let drops = [<Dropdown1 />, <Dropdown2 />, <Dropdown3 />, <Dropdown4 />];
      return drops[e-1];
   }

   checkIfOpen() {
      let klasa = 'dropdown_wrapper dropdown clearfix';
      if(this.props.open) {
         klasa += ' open';
      }
      if(this.props.active === 4) {
         klasa += ' last';
      }
      return klasa;
   }

   render() {
      let visina = window.screen.height;

      // if(this.props.open) {
      //    this.thumbsHeight();
      // }
      
      return (
         <div id={this.props.id} className={this.checkIfOpen()} ref="wrapper">

               <div className="dropdown_inner clearfix">
                  <Scrollbars style={{height:visina}}>
                     {this.drops(this.props.active)}
                  </Scrollbars>
               </div>

            <button className="btn-link close_btn" onClick={this.props.close}>CLOSE MENU</button>
         </div>
      );
   }
}


MenuDropdownMob.propTypes = {
	active: PropTypes.number
};

MenuDropdownMob.defaultProps = {
	active: 0
};

export default MenuDropdownMob;