import React, { Component } from 'react';
//import { Router, Route, Link, browserHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';

import Product from './Product';
import Spinner from './Spinner';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

import SideFilter from './SideFilter';

import ResultsSideFilter from './ResultsSideFilter';

import { fixURLQuery, basePath, baseUrl,
   baseApiUrl, checkStatus, returnJSON, URLParamsToObject,
   scrollToTop, sortOptions, perPageOptions, serialize4URL } from '../lib/constants';

import anime from 'animejs';

class Results extends Component {

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
      query: {
         sort: 'pd.name',
         order: 'ASC',
         limit: 12,
         page: 0
      }
   };

   // constructor(props) {
   //    super(props);
   // }

   componentWillMount() {
      // let query = fixURLQuery(this.props.location.query);
      // console.log(query);
      // query.map((val,key) => {
      //    this.setState({ [key]: val });
      // });
      // this.setState({ query: query });
      // this.getData(this.props.location.search.replace('?', '&'));
      let query = URLParamsToObject();
      Object.entries(query).map((val,key) => {
         this.setState({ [key]: val });
      });
      this.setState({ query: query });
      this.getData('&'+serialize4URL(query));
   }

   componentWillReceiveProps(newProps) {
      // this.setState({ loading: true });
      // if(newProps.location.search !== this.props.location.search) {
      //    let query = fixURLQuery(newProps.location.query);
      //    query.map((val,key) => {
      //       this.setState({ [key]: val });
      //    });
      //    this.setState({ query: query });
      //    //document.querySelector("#filter_result .products").fadeOut();
      //    this.getData(newProps.location.search.replace('?', '&'));
      // }
      this.setState({ loading: true });
      if(newProps.location.search !== this.props.location.search) {
         let query = URLParamsToObject(newProps.location.query);
         Object.entries(query).map((val,key) => {
            this.setState({ [key]: val });
         });
         this.setState({ query: query });

         anime({
            targets: document.querySelector("#filter_result .products"),
            opacity: 0,
            easing: 'easeInOutQuad',
            duration: 250,
            complete: el => {
               document.querySelector("#filter_result .products").style.display = 'none';
            }
         });
         //document.querySelector("#filter_result .products").fadeOut();
         //this.getData(newProps.location.search.replace('?', '&'));
         this.getData('&'+serialize4URL(query));
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
            let pages = Math.round(data.count / this.state.query.limit);
            let totalPages = pages > 0 ? pages : 0;
            this.setState({ data: data.result, totalPages: totalPages }, () => {
               this.setState({ loading: false });
               anime({
                  targets: document.querySelector("#filter_result .products"),
                  opacity: 1,
                  easing: 'easeInOutQuad',
                  duration: 250,
                  complete: el => {
                     document.querySelector("#filter_result .products").style.display = 'block';
                  }
               });
               //$("#filter_result .products").fadeIn();
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
      scrollToTop();
      this.props.history.push(basePath+'filter?' + serialize4URL(query));
   };

   handleLimitChange = (num) => {
      let query = this.state.query;
      query['limit'] = num.value;
      delete query.page;
      this.setState({ page:0 });
      scrollToTop();
      this.props.history.push(basePath+'filter?' + serialize4URL(query));
   };

   handleSortChange = (val) => {
      let sortOrder = val.value.split("|");
      let query = this.state.query;
      query['sort'] = sortOrder[0];
      query['order'] = sortOrder[1];
      delete query.page;
      this.setState({ page:0 });
      scrollToTop();
      this.props.history.push(basePath+'filter?' + serialize4URL(query));
   };

   filterResults() {
      return this.state.data.map((val, key) => {
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

               <ResultsSideFilter query={this.state.query} search={'&'+serialize4URL(this.state.query)} />

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
                              value={parseInt(this.state.query.limit)}
                              options={perPageOptions}
                              onChange={this.handleLimitChange.bind(this)}
                              name="limit" />
                        </div>

                        <div className="col-lg-4 sortBy">
                           <label>Sortieren nach:</label>
                           <Select clearable={false}
                              value={this.state.query.sort+'|'+this.state.query.order}
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

Results.propTypes = {
   source: PropTypes.array,
   max: PropTypes.number
};

Results.defaultProps = {
   source: [],
   max: 1
};

export default withRouter(Results);