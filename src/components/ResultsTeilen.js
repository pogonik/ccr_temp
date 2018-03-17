import React, { Component } from 'react';
import { withRouter } from "react-router";

import Product from './Product';
import Spinner from './Spinner';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import SideFilterGroup from './form_items/SideFilterGroup';

import FilterByVehicleTeilen from '../forms/FilterByVehicleTeilen';

import { basePath, getURLQuery,
   baseApiUrl, checkStatus, returnJSON, URLParamsToObject,
   scrollToTop, serialize4URL, getPathname } from '../lib/constants';
import { sortOptions, perPageOptions } from '../lib/helpers';

import anime from 'animejs';

// let options = {
//    '51': 'batterie',
//    '52': 'kettenkits',
//    '53': 'bremsbelaege'
// };
let cat_id = getURLQuery('typs');
let type = getURLQuery('type');
let adresa = 'filter_teilen';

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
         typs: cat_id,
         type: type,
         sort: 'pd.name',
         order: 'ASC',
         limit: 12,
         page: 0
      },
      sideQuery: {},
      search: [],
      message: ''
   };


   componentDidMount() {
      this.getData(decodeURIComponent(this.props.location.search.replace('?','&')));
   }

   componentWillReceiveProps(newProps) {
      if(newProps.location.search !== this.props.location.search) {
         this.getData(decodeURIComponent(newProps.location.search.replace('?','&')));
      }
   }


   getData(query) {

      adresa = this.state.sideQuery.hasOwnProperty('marka') ? 'filter_teilen/get_product_data' : 'filter_teilen';

      fetch(baseApiUrl+adresa+query, {
         method: "GET",
         credentials: "same-origin"
      }).then(checkStatus).then(returnJSON)
      .then(data => {
         if(data.count >= 0) {
            this.fade(1,'block');
            this.setState({ data: data.result, totalPages: data.totalPages, error: false }, () => {
               this.setState({ loading: false });
            });
         } else {
            this.setState({ error: true, message: 'There is no products...' });
         }
      }).catch(err => {
         this.setState({ error: true, message: 'Error! Please, refresh the page and try again.' });
         console.log(err);
      });
   }


   handlePageChange = (page) => {
      let query = this.state.query;
      query['page'] = page.selected;
      this.setState({ query });
      this.fade(0, 'none');
      scrollToTop();

      let redirect = serialize4URL(query)+'&'+serialize4URL(this.state.sideQuery);
      this.props.history.replace(basePath+'filter_teilen?' + decodeURIComponent(redirect));
   };

   handleLimitChange = (num) => {
      let query = this.state.query;
      query['limit'] = num.value;
      delete query.page;
      this.setState({ query });
      this.fade(0, 'none');
      scrollToTop();
      
      let redirect = serialize4URL(query)+'&'+serialize4URL(this.state.sideQuery);
      this.props.history.replace(basePath+'filter_teilen?' + decodeURIComponent(redirect));
   };

   handleSortChange = (val) => {
      let sortOrder = val.value.split("|");
      let query = this.state.query;
      query['sort'] = sortOrder[0];
      query['order'] = sortOrder[1];
      delete query.page;
      this.setState({ query });
      this.fade(0, 'none');
      scrollToTop();
      
      let redirect = serialize4URL(query)+'&'+serialize4URL(this.state.sideQuery);
      this.props.history.replace(basePath+'filter_teilen?' + decodeURIComponent(redirect));
   };

   filterResults() {
      return this.state.data.map((val, key) => {
         return <Product key={key} data={val} />
      });
   }






   updateQuery(sideQuery) {
      this.setState({ loading: true });
      this.setState({ sideQuery });
      this.fade(0, 'none');
      let query = serialize4URL(this.state.query)+'&'+serialize4URL(sideQuery);
      this.props.history.replace(basePath+'filter_teilen?' + decodeURIComponent(query));
   }

   submitQuery(sideQuery) {
      this.setState({ sideQuery });
      scrollToTop();
      this.fade(0, 'none');
      let query = serialize4URL(this.state.query)+'&'+serialize4URL(sideQuery);
      this.props.history.replace(basePath+'filter_teilen?' + decodeURIComponent(query));
   }


   fade(opacity,display) {
      anime({
         targets: '#filter_result .products',
         opacity: opacity,
         easing: 'easeInOutQuad',
         duration: 250,
         complete: el => {
            //document.querySelector("#filter_result .products").style.display = display;
         }
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

      let error = (this.state.error === true && !this.state.loading) ? <p className="text-center">{this.state.message}</p> : '';

      return (

         <div className="row">

            <aside id="side_filter" className="col-lg-2">


               <FilterByVehicleTeilen type={type} onChange={this.submitQuery.bind(this)} />

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