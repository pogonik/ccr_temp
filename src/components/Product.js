import React from 'react';
import PropTypes from 'prop-types';

import Stars from './Stars';

const Product = (props) => {

   const addToWishList = () => {
      //wishlist.add(this.props.data.id);
   };

   const markers = ['', <span className="new_icon">NEU</span>, <span className="best_icon"></span>];

   let is_guma = props.data.cat_parent === '49' ? true : false;

   let opis = '';

   if(props.data.hasOwnProperty('desc') && (props.data.desc !== null || typeof props.data.desc !== undefined)) {
      opis = props.data.desc.substr(0, 60);
      opis = opis.substring(0, opis.lastIndexOf(' '));
      opis += props.data.desc.length >= 60 ? '…' : '';
      opis = <p>{opis}</p>;
   }

   if(is_guma) {
      let breite = props.data.atts.breite ? props.data.atts.breite : '';
      let hoehe = props.data.atts.hoehe ? '/' + props.data.atts.hoehe : ' -';
      let bauart = (props.data.atts.bauart) ? ' '+props.data.atts.bauart : ' ';
      let zoll = props.data.atts.zoll ? ' '+props.data.atts.zoll : '';
      let antrieb = props.data.atts.antrieb ? props.data.atts.antrieb : '';
      opis = <span><p>{breite + hoehe + bauart + zoll}</p><p>{antrieb}</p></span>;
   }

   let cat_url = props.data.cat_url ? props.data.cat_url : '';
   let cat_name = props.data.cat_name ? props.data.cat_name.toUpperCase().substr(0,23) : '';

   let brand_url = props.data.brand_url ? props.data.brand_url : '';
   let brand_name = props.data.brand_name ? props.data.brand_name : '';

   let url = props.data.url ? props.data.url : '';
   let name = props.data.name ? props.data.name : '';
   let image = props.data.image ? props.data.image : '';
   let price = props.data.price ? props.data.price : '';

   let klase = "thumbnail card product carousel-cell " + props.klase;

   var marker = markers[props.marker];


   return (
      <div className={klase} style={props.style}>


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

               <button className="btn btn-default add_wish_btn" onClick={addToWishList}></button>

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

Product.propTypes = {
   price: PropTypes.string,
   klase: PropTypes.string,
   marker: PropTypes.number
};

Product.defaultProps = {
   price: '',
   klase: '',
   marker: 0
};

export default Product;