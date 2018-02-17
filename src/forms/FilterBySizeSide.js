import React, { PropTypes, Component } from 'react';
import { Router, Route, browserHistory, withRouter } from 'react-router';

import Select from 'react-select';
import { Tire } from '../svg/Icons';
import { basePath, baseUrl, baseApiUrl, checkStatus, returnJSON } from '../lib/constants';

export default class FilterBySizeSide extends Component {

   static propTypes = {
   };

   static defaultProps = {
   };

   state = {
      sizes: {breite:null, hoehe: null, zoll: null},
      breite: null,
      hoehe: null,
      zoll: null,
      tireColors: ['#666', '#666', '#666']
   };

   constructor(props) {
      super(props);
   }

   componentWillMount() {
      _.map(this.props.query.atts, (val,key) => {
         this.setState({ [key]:val });
      });
      this.setState({ sizes:this.props.query.atts });
   }

   componentWillReceiveProps(nextProps) {
      this.setState({ sizes:nextProps.query.atts });
   }

   handleFocus = (e) => {
      var colors = [];
      for(var i = 0; i < 3; i++) {
         colors[i] = '#666';
         if(i === e) {
            colors[i] = '#ff4500';
         }
      }
      this.setState({ tireColors: colors });
   };

   handleSelectChange = (key, val) => {
      let atts = this.props.query.atts;
      let params = _.omit(this.props.query, 'atts');

      if(val === null) {
         atts = _.omit(atts, [key]);
         this.setState({ [key]: null });
      } else {
         atts[key] = val.value;
         this.setState({ [key]: val.value });
      }
      params['atts'] = atts;
      browserHistory.push(basePath+'filter?'+decodeURIComponent($.param(params)));
   }

   render() {

      return (
         <div className="side_filter_group reifengrosse clearfix">
            <h3 className="subtitle">
               <a role="button" href={'#side_filter_reifengrosse'} data-toggle="collapse" data-parent="side_filter" className="collapsed">Filter By Size</a>
            </h3>

            <form id="side_filter_reifengrosse" className="collapse">

               <Tire id="tire" colors={this.state.tireColors} style={{width:'100%', height:'100%'}} />

               <Select clearable={true}
                  placeholder="Breite"
                  name="atts[breite]"
                  value={this.state.breite}
                  options={this.props.options.breite}
                  onFocus={this.handleFocus.bind(this, 0)}
                  onChange={this.handleSelectChange.bind(this, 'breite')} />

               <Select clearable={true}
                  placeholder="Hoehe"
                  name="atts[hoehe]"
                  value={this.state.hoehe}
                  options={this.props.options.hoehe}
                  onFocus={this.handleFocus.bind(this, 1)}
                  onChange={this.handleSelectChange.bind(this, 'hoehe')} />

               <Select clearable={true}
                  placeholder="Zoll"
                  name="zoll"
                  value={this.state.zoll}
                  options={this.props.options.zoll}
                  onFocus={this.handleFocus.bind(this, 2)}
                  onChange={this.handleSelectChange.bind(this, 'zoll')} />
            </form>
         </div>
      );
   }
}
