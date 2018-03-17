import React, { PropTypes, Component } from 'react';
import PropTypes from 'prop-types';

import { baseUrl, checkStatus, returnJSON } from '../lib/constants';

const RelatedProduct = (props) => {
   return (
      <div className="product carousel-cell">
         <div className="thumb">
            <a href={props.url}>
               <img src={props.image} alt={props.name} className="img-responsive" />
            </a>
         </div>
         <div className="desc">
            <a href={props.url}><h3>{props.brand_name}</h3></a>
            <a href={props.url}><h4>{props.name}</h4></a>
         </div>
         <div className="mask"></div>
      </div>
   );
}

RelatedProduct.propTypes = {
   image: PropTypes.string,
   price: PropTypes.string,
   klase: PropTypes.string,
   marker: PropTypes.number,
   url: PropTypes.string,
   brand_url: PropTypes.string,
   cat_name: PropTypes.string,
   cat_url: PropTypes.string,
   quantity: PropTypes.number,
};

RelatedProduct.defaultProps = {
   image: baseUrl+'image/no_image.png',
   price: '',
   klase: '',
   marker: 0,
   url: '',
   brand_url: '',
   cat_name: '',
   cat_url: '',
   quantity: 1
};

export default RelatedProduct;