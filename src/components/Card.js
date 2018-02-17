import React, { PropTypes, Component } from 'react';

import { baseUrl, checkStatus, returnJSON } from '../lib/constants';
import { Heart2Icon } from '../svg/Icons';

import Stars from './Stars';

export default class Card extends Component {

   static defaultProps = {
      price: '',
      klase: '',
      marker: 0,
      url: '',
      brand_url: '',
      cat_name: '',
      cat_url: ''
   };

   constructor(props) {
      super(props);
   }

   markers = ['', <span className="new_icon">NEU</span>, <span className="best_icon"></span>];

   addToCart = () => {
      cart.add(this.props.id, 1);
   };

   addToWishList = () => {
      wishlist.add(this.props.id);
   };

   render() {
      let klase = "thumbnail card product carousel-cell " + this.props.klase;
      let num = Math.floor(Math.random()*4);
      let image = this.props.image;

      var marker = this.markers[this.props.marker];

      return (
         <div className={klase} style={this.props.style}>

            <div className="thumb">
               <a href={this.props.url}>
                  <img src={this.props.image} alt={this.props.name} />
               </a>
            </div>

            <div className="desc">
               <a href={this.props.brand_url}><h2>{this.props.brand_name}</h2></a>
               <a href={this.props.url}><h3 className="prod_title">{this.props.name}</h3></a>

               <div className="clearfix">
                  <Stars />
                  <div className="price">{this.props.price}</div>
               </div>

               <div className="category">
                  <a href={this.props.cat_url}>{this.props.cat_name}</a>
               </div>

               <div className="buttons">
                  <button className="btn btn-default add_cart_btn" onClick={this.addToCart}>Add to Cart</button>
                  <button className="btn btn-default add_wish_btn" onClick={this.addToWishList}></button>
               </div>

            </div>

            {marker}

            <div className="mask"></div>

         </div>
      );
   }
}
