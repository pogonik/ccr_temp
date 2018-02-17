import React, { PropTypes, Component } from 'react';

import SideFilterGroup from './form_items/SideFilterGroup';
import FilterByVehicleSide from '../forms/FilterByVehicleSide';

import { baseUrl, baseApiUrl, getURLQuery, getPathname} from '../lib/constants';

export default class SideFilter extends Component {

   state = {
      brands: 'filter/get_options&wanted=brands'+window.location.search.replace('?','&'),
      cats: 'filter/get_options&wanted=typs'+window.location.search.replace('?','&'),
      title: '',
      valName: '',
      root: '',
      rootVal: '',
      parent: ''
   };

   constructor(props) {
      super(props);
   }

   componentWillMount() {

      if(getURLQuery('route')) {

         if(getURLQuery('manufacturer_id')) {
            this.setState({
               source: 'categories/by_brand&manufacturer_id='+getURLQuery('manufacturer_id'),
               title: 'Typ',
               valName: 'typs',
               root: 'brands',
               rootVal: getURLQuery('manufacturer_id')
            });
         } else {

            let parent = $.ajax({
               url: baseApiUrl+'categories/get_parent&path='+getURLQuery('path'),
               async: false
            });
            parent = parent.responseJSON === '0' ? '' : parent.responseJSON;
            this.setState({
               source: 'brands/by_cat&path='+getURLQuery('path'),
               title: 'Marken',
               valName: 'brands',
               root: 'typs',
               rootVal: getURLQuery('path'),
               parent: parent.id
            });
         }

      } else {

         let originURL = getPathname();

         let req = $.ajax({
            url: baseApiUrl+'filter/get_origin_url&keyword='+originURL,
            async: false
         });

         let path = req.responseJSON.split("=");

         if(path[0] === 'category_id') {

            let parent = $.ajax({
               url: baseApiUrl+'categories/get_parent&path='+path[1],
               async: false
            });
            parent = parent.responseJSON === '0' ? '' : parent.responseJSON;
            this.setState({
               source: 'brands/by_cat&path='+path[1],
               title: 'Marken',
               valName: 'brands',
               root: 'typs',
               rootVal: path[1],
               parent: parent.id
            });
         } else {
            this.setState({
               source: 'categories/by_brand&manufacturer_id='+path[1],
               title: 'Typ',
               valName: 'typs',
               root: 'brands',
               rootVal: path[1]
            });
         }
      }
   }


   submitForm = (val) => {
      let { valName, root, rootVal, parent } = this.state;

      if(parent === '') {
         let root_cat = $.ajax({
            url: baseApiUrl+'categories/get_parent&path='+val[0],
            async: false
         });
         parent = root_cat.responseJSON.id === '0' ? '' : root_cat.responseJSON.id;
      }

      window.location = baseUrl+'filter?'+valName+'='+val[0]+'&'+root+'='+rootVal+'&parent='+parent;
   }


   render() {

      let cat_id = $("#side_filter").data('cat');
      let side = '';

      if([51,52,53].indexOf(cat_id) !== -1) {
         side = <FilterByVehicleSide />;
      }
      return (
         <div className="clearfix">

            <SideFilterGroup
               className="side_filter_group marken clearfix"
               source={this.state.source}
               id="side_filter_marken"
               valName={this.state.valName}
               onChange={this.submitForm.bind(this)}
               title={this.state.title} />

            {side}
         </div>
      );
   }
};
