import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { baseUrl, baseApiUrl, checkStatus, returnJSON } from '../../lib/constants';

import RelatedProduct from '../RelatedProduct';

class RelatedSlider extends Component {

   state = {
      cards: [],
   };

   componentWillMount() {
      this.fetchData(this.props.products);
      window.addEventListener('resize', this.handleResize);
   }

   componentWillUnmount () {
      window.removeEventListener('resize', this.handleResize);
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
      var url = baseUrl + 'index.php?route=api/products/' + this.props.source;

      fetch(url, {
         credentials: "same-origin"
      }).then(checkStatus)
         .then(returnJSON)
         .then(data => {

            var cards = _.map(data, (val, key) => {
               return this.newCard(val, key);
            });

            this.setState({ cards: cards });
      }).then(res => {
         this.setupSlider()
      });
   };

   newCard(val, key) {
      return (
         <RelatedProduct key={key}
            prod_id={val.id}
            url={val.href}
            image={val.thumb}
            name={val.name}
            brand_name={val.brand} />
      );
   };

   render() {
      return (
         <div>
            <h3 className="subtitle text-center">Related products</h3>
            <div className="products">
               {this.state.cards}
            </div>
         </div>
      );
   }
}

RelatedSlider.propTypes = {
   title: PropTypes.string
};

RelatedSlider.defaultProps = {
   title: ''
};

export default RelatedSlider;