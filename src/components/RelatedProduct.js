import React, { PropTypes, Component } from 'react';
import PropTypes from 'prop-types';

import { baseUrl, checkStatus, returnJSON } from '../lib/constants';

class RelatedProduct extends Component {

   render() {
      let { image } = this.props;

      return (
         <div className="product carousel-cell">
            <div className="thumb">
               <a href={this.props.url}>
                  <img src={image} alt={this.props.name} className="img-responsive" />
               </a>
            </div>
            <div className="desc">
               <a href={this.props.url}><h3>{this.props.brand_name}</h3></a>
               <a href={this.props.url}><h4>{this.props.name}</h4></a>
            </div>
            <div className="mask"></div>
         </div>
      );
   }
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