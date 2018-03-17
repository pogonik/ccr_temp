import React, { Component } from 'react';

import Selekt from 'react-select';

import { baseUrl, baseApiUrl, checkStatus, returnJSON, getURLQuery, serialize, serialize4URL, getPathname } from '../lib/constants';

let type = getURLQuery('type');

let opts = ['marka', 'ccm', 'model', 'year', 'antrieb'];

export default class FilterByVehicleTeilen extends Component {

   state = {
      selectOptions: [],
      markaOptions: [],
      query: {},
      atts: {},
      antriebOptions: [
         {value: "bremsbelaege_vorne",label: "Vorderrad"},
         {value: "bremsbelaege_hinten",label: "Hinterrad"}
      ],
      disabled: [true, true, true, true, true, true]
   };

   componentWillMount() {
      this.checkData();
      this.getMarkaData();
   }

   componentWillReceiveProps(nextProps) {
      
   }

   checkData() {
      opts.forEach((itm,i) => {
         let query = this.state.query;
         let disabled = this.state.disabled;
         if(getURLQuery(itm)) {
            query[itm] = getURLQuery(itm);
            disabled[i] = false;
            this.setState({ query, disabled });
         }
      });
   }

   getMarkaData = () => {
      var url = baseApiUrl + 'filter_teilen/get_marka_data&type='+type;
      fetch(url)
         .then(checkStatus)
         .then(returnJSON)
         .then(data => {
            this.setState({ markaOptions: data, disabled: [false, true, true, true, true, true] });
         });
   }

   getModelData() {

      let params = serialize(document.getElementById('vehicle_form_side'));
      params = decodeURIComponent(params+'&type='+type);
      // document.getElementById('vehicle_form_wrapper').classList.add('loading');
      fetch(baseApiUrl + 'filter_teilen/get_model_data&'+params)
         .then(checkStatus)
         .then(returnJSON)
         .then(data => {
            // this.setState({ selectOptions: data.vehicle, atts: data.atts });
            if(data.hasOwnProperty('vehicle')) {
               this.setState({ selectOptions: data.vehicle }, () => {
                  //document.getElementById('vehicle_form_wrapper').classList.remove('loading');
               });
            } else {
               this.setState({ atts: data }, () => {
                  //document.getElementById('vehicle_form_wrapper').classList.remove('loading');
               });
            }

         });
   };

   handleSelect(name, val) {

      let niz = ['marka', 'ccm', 'model', 'year', 'antrieb'];

      let num = niz.indexOf(name);

      let { query, disabled } = this.state;

      if(val === null) {
         for(let i=num; i < 5; i++) {
            disabled[i+1] = true;
            delete query[name];
            //Object.assign(query, { [niz[i]]: val });
         }
      } else {
         disabled[num+1] = false;
         Object.assign(query, { [name]: val.value });
      }

      if(name === 'year' && type !== 'bremsbelaege') {
         if(val === null) {
            disabled[5] = true;
            delete query[name];
         } else {
            disabled[5] = false;
         }
      }

      this.setState({ query, disabled }, () => {
         this.getModelData();
         //console.log(query);
         this.props.onChange(query);
      });
   }

   submitValues = (e) => {
      e.preventDefault();
      //let query = serialize4URL(this.state.query);
      this.props.onChange(this.state.query);
      // params = params.replace('&', '%26');
      // window.location = baseUrl+'filter?'+params+'&type='+type;
      // window.location = baseUrl+'filter?'+params+'&parent=65,76,77&typs='+cat_id;
   };

   render() {

      let lastSelect = '';

      if(type === 'bremsbelaege') {
         lastSelect = (
            <div className="row">
               <Selekt
                  onChange={this.handleSelect.bind(this,'antrieb')}
                  value={this.state.query.antrieb}
                  name="antrieb"
                  options={this.state.antriebOptions}
                  id="1" searchable={false}
                  placeholder="Antrieb"
                  disabled={this.state.disabled[4]}
                  className="selekt" />
            </div>
         );
      }


      return (
         <div className="side_filter_group vehicle clearfix">
            <h3 className="subtitle">
               <a role="button" href={'#vehicle_form_side'} data-toggle="collapse" data-parent="side_filter" className="collapsed">Filter By Vehicle</a>
            </h3>
            <form id="vehicle_form_side" className="collapse" name="vehicle">

               <div className="col-lg-12">

                  <div className="row">
                     <Selekt
                        onChange={this.handleSelect.bind(this,'marka')}
                        value={this.state.query.marka}
                        name="marka"
                        options={this.state.markaOptions}
                        id="1" searchable={false}
                        placeholder="Motorradhelsteller"
                        disabled={this.state.disabled[0]}
                        className="selekt" />
                  </div>

                  <div className="row">
                     <Selekt
                        onChange={this.handleSelect.bind(this,'ccm')}
                        value={this.state.query.ccm}
                        name="ccm"
                        options={this.state.selectOptions.ccm}
                        id="1" searchable={false}
                        placeholder="Hubraum"
                        disabled={this.state.disabled[1]}
                        className="selekt" />
                  </div>

                  <div className="row">
                     <Selekt
                        onChange={this.handleSelect.bind(this,'model')}
                        value={this.state.query.model}
                        name="model"
                        options={this.state.selectOptions.model}
                        id="1" searchable={false}
                        placeholder="Modell"
                        disabled={this.state.disabled[2]}
                        className="selekt" />
                  </div>

                  <div className="row">
                     <Selekt
                        onChange={this.handleSelect.bind(this,'year')}
                        value={this.state.query.year}
                        name="year"
                        options={this.state.selectOptions.year}
                        id="1" searchable={false}
                        placeholder="Jahr"
                        disabled={this.state.disabled[3]}
                        className="selekt" />
                  </div>

                  {lastSelect}

                  <div className="row">
                     <button type="submit"
                        onClick={this.submitValues}
                        disabled={this.state.disabled[5]}
                        className="btn btn-default btn-submit">
                           Search
                     </button>
                  </div>

               </div>
            </form>
         </div>
      );
   }
}
