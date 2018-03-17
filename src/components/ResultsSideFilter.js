import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SideFilterGroup from './form_items/SideFilterGroup';
import FilterBySizeSide from '../forms/FilterBySizeSide';
import FilterByVehicleSide from '../forms/FilterByVehicleSide';

//import { Router, Route, Link, browserHistory } from 'react-router';
import { baseApiUrl, checkStatus, returnJSON } from '../lib/constants';

class ResultsSideFilter extends Component {

   state = {
      brandsSource: 'filter/get_options&wanted=brands'+window.location.search.replace('?','&'),
      typsSource: 'filter/get_options&wanted=typs'+window.location.search.replace('?','&'),
      parent: '49',
      brands: [],
      typs: [],
      atts: [],
      breite: '',
      hoehe: '',
      zoll:''
   };

   componentWillMount() {
      ['brands','typs','atts'].forEach((val) => {
         this.getAttributes(val,this.props.search.replace('?', '&'));
      });
   }

   componentWillReceiveProps(newProps) {
      if(newProps.query !== this.props.query) {
         ['brands','typs','atts'].forEach((val) => {
            this.getAttributes(val,newProps.search.replace('?', '&'));
         });
      }
   }

   getAttributes(wanted, search) {
      fetch(baseApiUrl+'filter/get_attributes&wanted='+wanted+search, {credentials: "same-origin"})
      .then(checkStatus).then(returnJSON)
      .then(data => {
         this.setState({ [wanted]: data });
      }).catch(err => {
         this.setState({ error: true });
         console.log(err);
      });
   }

   handleCheckbox(key, val) {
      let query = this.props.query;

      if(val.length === 0) {
         //query = _.omit(query, [key]);
         delete query[key];
      }
      else if(val.length > 1) {
         query[key] = val.join("-");
      } else {
         query[key] = val[0];
      }
      this.setState({ [key]:val });
      //browserHistory.push(basePath+'filter?' + decodeURIComponent(serialize2(query)));
   }

   scrollToTop = () => {
      //document.querySelector("body").animate({ scrollTop:400 });
   }

   render() {

      let { query } = this.props;

      let sizes = '';
      if(query.hasOwnProperty('parent') && query.parent === '49') {
         sizes = <FilterBySizeSide options={this.state.atts} query={query} />;
      }



      let selectedBrands = [];
      if(query.hasOwnProperty('brands')) {
         if(query.brands.length > 1) {
            selectedBrands = query.brands.split("-");
         } else {
            selectedBrands = query.brands[0];
         }
      }

      let selectedTyps = [];
      if(query.hasOwnProperty('typs')) {
         if(query.typs.length > 1) {
            selectedTyps = query.typs.split("-");
         } else {
            selectedTyps = query.typs[0];
         }
      }


      let kategorije = (
         <SideFilterGroup
            selected={selectedTyps}
            ref="typ"
            className="side_filter_group typ clearfix"
            source={this.state.typsSource}
            activeItems={this.state.typs}
            id="side_filter_typ"
            valName="typs"
            onChange={this.handleCheckbox.bind(this, 'typs')}
            title="Typ" />
      );

      let vehicle = '';
      if(query.hasOwnProperty('atts') && Object.keys(query.atts).length !== 0 && (query.hasOwnProperty('typs') && (query.typs === '51' || query.typs === '52' || query.typs === '53'))) {
         console.log(query);
         vehicle = <FilterByVehicleSide />;
         kategorije = '';
      }

      return (
         <div className="clearfix">
            <SideFilterGroup
               selected={selectedBrands}
               className="side_filter_group marken clearfix"
               ref="marken"
               source={this.state.brandsSource}
               activeItems={this.state.brands}
               id="side_filter_marken"
               valName="brands"
               onChange={this.handleCheckbox.bind(this, 'brands')}
               title="Marken" />


            {kategorije}
            {sizes}
            {vehicle}

            <input type="hidden" name="parent" value={this.state.filter} />

         </div>
      );
   }
}

ResultsSideFilter.defaultProps = {
   brands: [],
   typs: [],
   query: {}
};

ResultsSideFilter.propTypes = {
   brands: PropTypes.array,
   typs: PropTypes.array,
   query: PropTypes.object
};

export default ResultsSideFilter;