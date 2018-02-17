import React, { PropTypes, Component } from 'react';

import { baseUrl, baseApiUrl, checkStatus, returnJSON } from '../../lib/constants';

import Card from '../Card';

export default class ProductsSlider extends Component {

   static propTypes = {
      title: PropTypes.string
   };

   static defaultProps = {
      title: ''
   };

   state = {
      cards: [],
   };

   constructor(props) {
      super(props);
   }

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
      var url = baseApiUrl + 'products/' + this.props.source;

      fetch(url, {
         credentials: "same-origin"
      }).then(checkStatus)
         .then(returnJSON)
         .then(data => {

            var cards = data.map((val, key) => {
               return this.newCard(val, key);
            });

            this.setState({ cards: cards });
      }).then(res => { this.setupSlider() });
   };

   newCard(val, key) {
      var price = parseFloat(val.price).toFixed(2);
      return (
         <Card key={key}
            id={val.id}
            url={val.url}
            image={val.image}
            name={val.name}
            brand_name={val.brand_name}
            brand_url={val.brand_url}
            marker={this.props.marker}
            cat_name={val.cat_name}
            cat_url={val.cat_url}
            price={val.price} />
      );
   };

   render() {
      return (
         <div className={'products_list '+this.props.className}>
            <h2 className="page_title">{this.props.title}</h2>
            <div className="products vertical">
               {this.state.cards}
            </div>
         </div>
      );
   }
}
