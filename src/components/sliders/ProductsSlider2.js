import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { baseUrl, baseApiUrl, checkStatus, returnJSON } from '../../lib/constants';

import Flickity from 'flickity';

import Card from '../Card';

class ProductsSlider2 extends Component {

   state = {
      total: this.props.products.length,
      cards: [],
   };

   componentWillMount() {
      this.fetchData(this.props.products);
      window.addEventListener('resize', this.handleResize);
   }

   componentWillUnmount () {
      window.removeEventListener('resize', this.handleResize);
   }

   componentWillReceiveProps(newProps) {
      if(newProps.products !== this.props.products && newProps.products.length > 0) {
         this.fetchData(newProps.products);
      }
   }

   handleResize = (e) => {
      var flick = Flickity.data('#'+this.props.id+' .products');
      if(window.innerWidth < 1170) {
         flick.cellAlign = 0.5;
         flick.options.cellAlign = "center";
      } else {
         flick.cellAlign = 0;
         flick.options.cellAlign = "left";
      }
   }

   getCellAlign() {
      if(window.innerWidth < 1170)
         return 'center';
      else {
         return 'left';
      }
   }

   setupSlider() {
      var id = '#'+this.props.id;
      new Flickity(id+' .products', {
         wrapAround: true,
         cellAlign: this.getCellAlign(),
         pageDots: false
      });
   }

   fetchData = (prods) => {
      var testArr = [];
      var url = baseApiUrl + 'products/index/id/';
      prods.map((val, key) => {
         fetch(url + val)
            .then(checkStatus)
            .then(returnJSON)
            .then(data => {
               var card = this.newCard(data[0], key);
               this.setState({ cards: this.state.cards.concat(card) },
               () => {
                  testArr.push(key);
                  if(this.state.total === testArr.length) {
                     this.setupSlider();
                  }
               }
            );
         });
      });
   };

   newCard(val, key) {
      var price = parseFloat(val.price).toFixed(2);
      return (
         <Card key={key}
            image={val.image}
            title={val.name}
            brand={val.brand_name}
            marker={this.props.marker}
            price={val.price} />
      );
   };

   render() {
      return (
         <div className={'products_list '+this.props.className}>
            <div className="container">
               <h2 className="page_title">{this.props.title}</h2>
               <div className="products vertical">
                  {this.state.cards}
               </div>
            </div>
         </div>
      );
   }
}


ProductsSlider2.propTypes = {
   products: PropTypes.array,
   title: PropTypes.string
};

ProductsSlider2.defaultProps = {
   products: [],
   title: ''
};

export default ProductsSlider2;