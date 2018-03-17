import React, { Component } from 'react';
import { withRouter } from "react-router";

import Product from './Product';
import Spinner from './Spinner';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

import FilterByVehicleSide from '../forms/FilterByVehicleSide';

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
let type = getPathname();

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
         type: type,
         sort: 'pd.name',
         order: 'ASC',
         limit: 12,
         page: 0
      },
      search: []
   };


   componentDidMount() {
      let query = URLParamsToObject();
      Object.entries(query).forEach((val,key) => {
         this.setState({ [key]: val });
      });
      query = Object.assign(this.state.query, query);
      this.setState({ query: query });
      this.getData('&'+serialize4URL(query));
   }

   componentWillReceiveProps(newProps) {
      this.setState({ loading: true });
      if(newProps.location.search !== this.props.location.search) {
         let query = URLParamsToObject(newProps.location.query);
         Object.entries(query).forEach((val,key) => {
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
         this.getData('&'+serialize4URL(query));
      }
   }


   getData(query) {
      fetch(baseApiUrl+'filter_teilen/get_product_data'+query, {
         method: "GET",
         credentials: "same-origin"
      }).then(checkStatus).then(returnJSON)
      .then(data => {
         if(data.count < 1) {
            this.setState({ error: true, loading: false });
         } else {
            let totalPages = Math.round(data.count / this.state.query.limit);
            //let totalPages = pages > 0 ? pages : 0;
            let newQuery = Object.assign(this.state.query, URLParamsToObject());
            this.setState({ data: data.result, totalPages: totalPages, query: newQuery }, () => {
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
            });
         }
      }).catch(err => {
         this.setState({ error: true });
         console.log(err);
      });
   }


   // getData(query) {
   //    fetch(baseApiUrl+'filter_teilen'+query, {
   //       method: "GET",
   //       credentials: "same-origin"
   //    }).then(checkStatus).then(returnJSON)
   //    .then(data => {
   //       if(data.count < 1) {
   //          this.setState({ error: true, loading: false });
   //       } else {
   //          let newQuery = Object.assign(this.state.query, URLParamsToObject());
   //          console.log(newQuery);
   //          this.setState({ data: data.result, totalPages: data.totalPages, query: newQuery }, () => {
   //             this.setState({ loading: false });
   //             anime({
   //                elements: document.querySelector("#filter_result .products"),
   //                opacity: 1,
   //                duration: 500
   //             });
   //          });
   //       }
   //    }).catch(err => {
   //       this.setState({ error: true });
   //       console.log(err);
   //    });
   // }

   

   handlePageChange = (page) => {
      let query = this.state.query;
      query['page'] = page.selected;
      scrollToTop();
      this.props.history.push(basePath+'filter_teilen?' + serialize4URL(query));
   };

   handleLimitChange = (num) => {
      let query = this.state.query;
      query['limit'] = num.value;
      delete query.page;
      this.setState({ page:0 });
      scrollToTop();
      this.props.history.push(basePath+'filter_teilen?' + serialize4URL(query));
   };

   handleSortChange = (val) => {
      let sortOrder = val.value.split("|");
      let query = this.state.query;
      query['sort'] = sortOrder[0];
      query['order'] = sortOrder[1];
      delete query.page;
      this.setState({ page:0 });
      scrollToTop();
      this.props.history.push(basePath+'filter_teilen?' + serialize4URL(query));
   };

   // handlePageChange = (page) => {
   //    let query = this.state.query;
   //    query['page'] = page.selected;

   //    this.setState({ query }, () => {
   //       delete query.route;
   //       this.getData('/get_product_data&'+serialize4URL(query));
   //       scrollToTop();
   //    });
   //    this.props.history.push(basePath+'filter_teilen?' + decodeURIComponent(serialize4URL(query)));
   // };

   // handleLimitChange = (num) => {
   //    let query = this.state.query;
   //    query['limit'] = num.value;
   //    query['page'] = 0;

   //    this.setState({ query, page: 0 }, () => {
   //       delete query.route;
   //       this.getData('/get_product_data&'+serialize4URL(query));
   //       this.scrollToTop();

   //       this.props.history.push('index.php?route=api/filter_teilen/get_product_data&'+serialize4URL(query));
   //    });

   //    this.props.history.push(basePath+'filter_teilen?' + decodeURIComponent(serialize4URL(query)));
   // };

   // handleSortChange = (val) => {
   //    let sortOrder = val.value.split("|");

   //    let query = this.state.query;
   //    query['sort'] = sortOrder[0];
   //    query['order'] = sortOrder[1];
      
   //    query['page'] = 0;

   //    this.setState({ query, page: 0 }, () => {
   //       delete query.route;
   //       this.getData('/get_product_data&'+serialize4URL(query));
   //       this.scrollToTop();
   //    });

   //    this.props.history.push(basePath+'filter_teilen?' + decodeURIComponent(serialize4URL(query)));
   // };

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
               <FilterByVehicleSide />
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