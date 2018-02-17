import React, { PropTypes, Component } from 'react';

import Selekt from 'react-select';
import Spinner from '../components/Spinner';

import { basePath, baseUrl, baseApiUrl, checkStatus, returnJSON, getURLQuery, serialize, serialize2 } from '../lib/constants';

let options = {
   51: 'batterie',
   52: 'kettenkits',
   53: 'bremsbelaege'
};

let cat_id = getURLQuery('typs') ? getURLQuery('typs') : document.getElementById("#side_filter").getAttribute('data-cat');

export default class FilterByVehicleSide extends Component {

   // static propTypes = {
   // };

   // static defaultProps = {
   // };

   state = {
      selectOptions: [],
      markaOptions: [],
      query: {},
      atts: {},
      marka: '',
      ccm: '',
      model: '',
      year: '',
      antrieb: '',
      antriebOptions: [
         {value: "bremsbelaege_vorne",label: "Vorderrad"},
         {value: "bremsbelaege_hinten",label: "Hinterrad"}
      ],
      disabled: [true, true, true, true, true, true]
   };

   // constructor(props) {
   //    super(props);
   // }

   componentWillMount() {
      this.getMarkaData();
   }

   getMarkaData = () => {
      var url = baseApiUrl + 'filter/get_marka_data';
      fetch(url)
         .then(checkStatus)
         .then(returnJSON)
         .then(data => {
            this.setState({ markaOptions: data, disabled: [false, true, true, true, true, true] });
         });
   }

   getModelData() {

      let params = serialize(document.getElementById('vehicle_form_side'));
      params = decodeURIComponent(params);
      // document.getElementById('vehicle_form_wrapper').classList.add('loading');
      fetch(baseApiUrl + 'filter/get_model_data&'+params)
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
            Object.assign(query, { [niz[i]]: val });
         }
      } else {
         disabled[num+1] = false;
         Object.assign(query, { [name]: val.value });
      }

      if(name === 'year' && (parseInt(cat_id) === 51 || parseInt(cat_id) === 52)) {
      //if(name === 'year') {
         if(val === null) {
            disabled[5] = true;
            $("form#vehicle_form_side input[name=antrieb]").remove();
         } else {
            disabled[5] = false;
            $("form#vehicle_form_side").append('<input type="hidden" name="antrieb" value="'+options[cat_id]+'" />');
         }
      }

      this.setState({ query, disabled }, this.getModelData);
   }

   submitValues = (e) => {
      e.preventDefault();
      let params = serialize2(this.state.atts);
      params = params.replace('&', '%26');
      window.location = baseUrl+'filter?'+params+'&parent=65,76,77&typs='+cat_id;
   };

   render() {

      let { marka, ccm, model, year, antrieb } = this.state;

      let lastSelect = '';

      if(cat_id === 53) {
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
