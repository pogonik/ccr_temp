import React, { PropTypes, Component } from 'react';
//import { browserHistory } from 'react-router-dom';
import { withRouter } from "react-router";

import Product from './Product';
import Spinner from './Spinner';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

import SideFilter from './SideFilter';

import ResultsSideFilter from './ResultsSideFilter';

import { fixURLQuery, basePath, baseUrl, baseApiUrl, checkStatus, returnJSON, serialize2 } from '../lib/constants';

import animejs from 'animejs';




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

class ResultsTeilen extends Component {

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
      },
      search: []
   };


   componentDidMount() {
      let search = window.location.search.replace('?', '&');
      this.getData(search.replace('get_model_data', 'get_product_data'));
   }

   // componentWillReceiveProps(newProps, newState) {
   //    this.setState({ loading: true });
   //    if(newProps.location.search !== this.props.location.search) {
   //       let query = fixURLQuery(newProps.location.query);
   //       query.map((val,key) => {
   //          this.setState({ [key]: val });
   //       });
   //       this.setState({ query: query });
   //       animejs({
   //          elements: document.querySelector("#filter_result .products"),
   //          opacity: 0,
   //          duration: 500
   //       });
   //       this.getData(newProps.location.search.replace('?', '&'));
   //    }

   //    if(newState.location.search !== this.state.location.search) {
   //       let search = newState.location.search.replace('?', '&');
   //       this.setState({ search });
   //       animejs({
   //          elements: document.querySelector("#filter_result .products"),
   //          opacity: 0,
   //          duration: 500
   //       });
   //       this.getData(search);
   //    }
   // }


   getData(query) {

      fetch(baseApiUrl+'filter_teilen'+query, {
         method: "GET",
         credentials: "same-origin"
      }).then(checkStatus)
      .then(returnJSON)
      .then(data => {
         if(data.count < 1) {
            this.setState({ error: true, loading: false });
         } else {
            let newQuery = Object.assign(this.state.query, data.query);
            this.setState({ data: data.result, totalPages: data.totalPages, query: newQuery }, () => {
               this.setState({ loading: false });
               animejs({
                  elements: document.querySelector("#filter_result .products"),
                  opacity: 1,
                  duration: 500
               });
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

      this.setState({ query }, () => {
         delete query.route;
         this.getData('/get_product_data&'+serialize2(query));
         this.scrollToTop();
      });
      //browserHistory.push(basePath+'filter?' + decodeURIComponent(serialize2(query)));
   };

   handleLimitChange = (num) => {
      let query = this.state.query;
      query['limit'] = num.value;
      query['page'] = 0;

      this.setState({ query, page: 0 }, () => {
         delete query.route;
         this.getData('/get_product_data&'+serialize2(query));
         this.scrollToTop();

         this.props.history.push('index.php?route=api/filter_teilen/get_product_data&'+serialize2(query));
      });

      //browserHistory.push(basePath+'filter?' + decodeURIComponent(serialize2(query)));
   };

   handleSortChange = (val) => {
      let sortOrder = val.value.split("|");

      let query = this.state.query;
      query['sort'] = sortOrder[0];
      query['order'] = sortOrder[1];
      
      query['page'] = 0;

      this.setState({ query, page: 0 }, () => {
         delete query.route;
         this.getData('/get_product_data&'+serialize2(query));
         this.scrollToTop();
      });

      //browserHistory.push(basePath+'filter?' + decodeURIComponent(serialize2(query)));
   };

   scrollToTop = () => {
      animejs({
         targets: document.querySelector('html, body'),
         scrollTop: document.getElementById('products_cont').offsetTop,
         easing: 'easeInOutQuad',
         duration: 500
      });
   }

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
               forcePage={parseInt(this.state.query.page)}
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


// ResultsTeilen.propTypes = {
// 	source: PropTypes.array,
// 	max: PropTypes.number
// };

ResultsTeilen.defaultProps = {
	source: [],
	max: 1
};

export default withRouter(ResultsTeilen);