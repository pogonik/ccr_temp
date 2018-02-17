import React, { PropTypes, Component } from 'react';
import Select from 'react-select';

import { getURLQuery, URLParamsToObject } from '../lib/constants';

export default class Sort extends Component {

   state = {
      limit: '12',
      order: 'ASC',
      sort: 'pd.name'
   };

   constructor(props) {
      super(props);
   }

   componentWillMount() {
      let limit = getURLQuery('limit') ? getURLQuery('limit') : '12';
      let order = getURLQuery('order') ? getURLQuery('order') : 'ASC';
      let sort = getURLQuery('sort') ? getURLQuery('sort') : 'pd.name';

      this.setState({ limit, order, sort });
   }

   sortOptions = [
      { value: 'pd.name|ASC', label: 'Name (A - Z)' },
      { value: 'pd.name|DESC', label: 'Name (Z - A)' },
      { value: 'p.price|ASC', label: 'Price (low > high)' },
      { value: 'p.price|DESC', label: 'Price (high > low)' },
      { value: 'm.name|ASC', label: 'Brand (A - Z)' },
      { value: 'm.name|DESC', label: 'Brand (Z - A)' }
   ];

   perPageOptions = [
      { value: '12', label: '12' },
      { value: '24', label: '24' },
      { value: '48', label: '48' },
      { value: '96', label: '96' }
   ];

   setSort = (name, e) => {
      if(name === 'sort') {
         let opts = e.value.split("|");
         this.setState({ sort: opts[0], order: opts[1] }, this.submitForm);
      } else {
         this.setState({ limit: e.value }, this.submitForm);
      }
   }

   submitForm() {

      let urlObject = URLParamsToObject();
      urlObject['limit'] = this.state.limit
      urlObject['order'] = this.state.order
      urlObject['sort'] = this.state.sort

      window.location = window.location.pathname +'?'+ decodeURIComponent($.param(urlObject));
   }

   render() {
      return (
         <div className="row filterOptions">
            <form id="sort_form" method="GET">
               <div className="col-md-2 perPage">
                  <label>Anzeige:</label>
                  <Select clearable={false}
                     className="perPage"
                     value={this.state.limit}
                     options={this.perPageOptions}
                     onChange={this.setSort.bind(this, 'limit')} />
               </div>

               <div className="col-md-4 sortBy">
                  <label>Sortieren nach:</label>

                  <Select clearable={false}
                     value={this.state.sort+'|'+this.state.order}
                     options={this.sortOptions}
                     onChange={this.setSort.bind(this, 'sort')} />

               </div>
               <input type="hidden" name="sort" value={this.state.sort} />
               <input type="hidden" name="order" value={this.state.order} />
               <input type="hidden" name="limit" value={this.state.limit} />
            </form>
         </div>
      );
   }
}
