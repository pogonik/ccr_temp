import React, { PropTypes, Component } from 'react';

import { baseUrl } from '../lib/constants';
import { Heart2Icon } from '../svg/Icons';

import Stars from './Stars';

export default class Product extends Component {

   static defaultProps = {
      price: '',
      klase: '',
      marker: 0
   };

   constructor(props) {
      super(props);
   }

   addToWishList = () => {
      //wishlist.add(this.props.data.id);
   };

   markers = ['', <span className="new_icon">NEU</span>, <span className="best_icon"></span>];

   render() {

      let data = this.props.data;

      let is_guma = data.cat_parent === '49' ? true : false;

      // let opis = <p>{_.truncate(data.desc, {'length': 50,'omission': '...'})}</p>;
      let opis = <p>{data.desc}</p>;

      if(is_guma) {
         let breite = data.atts.breite ? data.atts.breite : '';
         let hoehe = data.atts.hoehe ? '/' + data.atts.hoehe : ' -';
         let bauart = (data.atts.bauart) ? ' '+data.atts.bauart : ' ';
         let zoll = data.atts.zoll ? ' '+data.atts.zoll : '';
         let antrieb = data.atts.antrieb ? data.atts.antrieb : '';
         opis = <span><p>{breite + hoehe + bauart + zoll}</p><p>{antrieb}</p></span>;
      }

      let cat_url = data.cat_url ? data.cat_url : '';
      let cat_name = data.cat_name ? data.cat_name.toUpperCase().substr(0,23) : '';

      let brand_url = data.brand_url ? data.brand_url : '';
      let brand_name = data.brand_name ? data.brand_name : '';

      let url = data.url ? data.url : '';
      let name = data.name ? data.name : '';
      let image = data.image ? data.image : '';
      let price = data.price ? data.price : '';

      let klase = "thumbnail card product carousel-cell " + this.props.klase;

      var marker = this.markers[this.props.marker];


      return (
         <div className={klase} style={this.props.style}>


            <div className="left">
               <div className="desc">

                  <div className="category">
                     <a href={cat_url}>{cat_name}</a>
                  </div>

                  <a href={brand_url}><h2>{brand_name}</h2></a>
                  <a href={url}><h3 className="prod_title">{name}</h3></a>

                  {opis}

                  <div className="clearfix">
                     <div className="price">{price}</div>
                  </div>

                  <button className="btn btn-default add_wish_btn" onClick={this.addToWishList}></button>

               </div>

               <div className="prod_bottom clearfix">
                  <Stars />
                  {marker}
               </div>
            </div>

            <div className="right thumb">
               <a href={url}>
                  <img src={image} alt={name} />
               </a>
            </div>

            <div className="mask"></div>

         </div>
      );
   }
}
