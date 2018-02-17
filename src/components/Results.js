import React, { PropTypes, Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import Product from './Product';
import Spinner from './Spinner';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

import SideFilter from './SideFilter';

import ResultsSideFilter from './ResultsSideFilter';

import { fixURLQuery, basePath, baseUrl, baseApiUrl, checkStatus, returnJSON } from '../lib/constants';

let sortOptions = [
   { value: 'pd.name|ASC', label: 'Name (A - Z)' },
   { value: 'pd.name|DESC', label: 'Name (Z - A)' },
   { value: 'p.price|ASC', label: 'Price (low > high)' },
   { value: 'p.price|DESC', label: 'Price (high > low)' },
   { value: 'm.name|ASC', label: 'Brand (A - Z)' },
   { value: 'm.name|DESC', label: 'Brand (Z - A)' }
];

let perPageOptions = [
   { value: 12, label: '12' },
   { value: 24, label: '24' },
   { value: 48, label: '48' },
   { value: 96, label: '96' }
];

export default class Results extends Component {

   static propTypes = {
      source: PropTypes.array,
      max: PropTypes.number
   };

   static defaultProps = {
      source: [],
      max: 1
   };

   state = {
      data: [],
      limit: 12,
      totalPages: 1,
      page: 0,
      currPage: 0,
      title: '',
      sort: 'pd.name',
      order: 'ASC',
      error: false,
      loading: true,
      query: {}
   };

   constructor(props) {
      super(props);
   }

   componentWillMount() {
      let query = fixURLQuery(this.props.location.query);
      _.map(query,(val,key) => {
         this.setState({ [key]: val });
      });
      this.setState({ query: query });
      this.getData(this.props.location.search.replace('?', '&'));
   }

   componentWillReceiveProps(newProps) {
      this.setState({ loading: true });
      if(newProps.location.search !== this.props.location.search) {
         let query = fixURLQuery(newProps.location.query);
         _.map(query,(val,key) => {
            this.setState({ [key]: val });
         });
         this.setState({ query: query });
         $("#filter_result .products").fadeOut();
         this.getData(newProps.location.search.replace('?', '&'));
      }
   }


   getData(query) {

      fetch(baseApiUrl+'filter'+query, {
         method: "GET",
         credentials: "same-origin"
      }).then(checkStatus)
      .then(returnJSON)
      .then(data => {
         if(data.count < 1) {
            this.setState({ error: true, loading: false });
         } else {
            let pages = Math.round(data.count / this.state.limit);
            let totalPages = pages > 0 ? pages : 0;
            this.setState({ data: data.result, totalPages: totalPages }, () => {
               this.setState({ loading: false });
               $("#filter_result .products").fadeIn();
            });
         }
      }).catch(err => {
         this.setState({ error: true });
         console.log(err);
      });
   }

   handlePageChange = (page) => {
      let query = this.state.query;
      query['page'] = page.selected;
      this.scrollToTop();
      browserHistory.push(basePath+'filter?' + decodeURIComponent($.param(query)));
   };

   handleLimitChange = (num) => {
      let query = this.state.query;
      query['limit'] = num.value;
      query = _.omit(query, 'page');
      this.setState({ page:0 });
      this.scrollToTop();
      browserHistory.push(basePath+'filter?' + decodeURIComponent($.param(query)));
   };

   handleSortChange = (val) => {
      let sortOrder = val.value.split("|");

      let query = this.state.query;
      query['sort'] = sortOrder[0];
      query['order'] = sortOrder[1];
      query = _.omit(query, 'page');
      this.setState({ page:0 });
      this.scrollToTop();
      browserHistory.push(basePath+'filter?' + decodeURIComponent($.param(query)));
   };

   scrollToTop = () => {
      $("body").animate({ scrollTop:400 });
   }

   filterResults() {
      return _.map(this.state.data,(val, key) => {
         return <Product key={key} data={val} />
      });
   }

   render() {

      let results = this.filterResults();

      let pagination = (this.state.totalPages <= 1) ? '' :
         <div className="pagination_wrapper">
            <ReactPaginate
               pageCount={this.state.totalPages}
               marginPagesDisplayed={2}
               pageRangeDisplayed={5}
               containerClassName={"pagination"}
               subContainerClassName={"pages pagination"}
               activeClassName={"active"}
               forcePage={parseInt(this.state.page)}
               onPageChange={this.handlePageChange} />
         </div>;

      let spinner = '';
      if(this.state.loading && this.state.error !== true) {
         spinner = <Spinner />;
      }

      let error = (this.state.error === true) ? <p className="text-center">There is no products...</p> : '';

      return (

         <div className="row">

            <aside id="side_filter" className="col-lg-2">

               <ResultsSideFilter query={this.state.query} search={this.props.location.search} />

            </aside>

            <div id="products_cont" className="products_cont col-lg-10">
               <div className="row">
                  <h1 className="page_title">Filter results</h1>
               </div>
               <div className="row">

                  <div id="filter_result" className="filter_result">

                     <div className="row filterOptions">
                        <div className="col-lg-2 perPage">
                           <label>Anzeige:</label>
                           <Select clearable={false}
                              className="perPage"
                              value={parseInt(this.state.limit)}
                              options={perPageOptions}
                              onChange={this.handleLimitChange.bind(this)}
                              name="limit" />
                        </div>

                        <div className="col-lg-4 sortBy">
                           <label>Sortieren nach:</label>
                           <Select clearable={false}
                              value={this.state.sort+'|'+this.state.order}
                              options={sortOptions}
                              onChange={this.handleSortChange.bind(this)}
                              name="selekt" />
                        </div>
                     </div>

                     <div className="products clearfix">
                        {results}
                        {pagination}
                     </div>
                     <div className="clearfix"></div>

                     {error}
                  </div>
                  {spinner}
               </div>
            </div>
         </div>
      );
   }
}
