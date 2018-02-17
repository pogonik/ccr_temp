import React, { PropTypes, Component } from 'react';

import Selekt from 'react-select';
import Spinner from '../components/Spinner';

import { basePath, baseUrl, baseApiUrl, checkStatus, returnJSON } from '../lib/constants';

export default class FilterByVehicleSideBKP extends Component {

   static propTypes = {
   };

   static defaultProps = {
   };

   state = {
      selectOptions: [],
      markaOptions: [],
      marka: '',
      ccm: '',
      model: '',
      year: '',
      antrieb: '',
      test: [],
      ccmOptions: [],
      antriebOptions: [
         {value: "front",label: "Vorderrad"},
         {value: "back",label: "Hinterrad"}
      ],
      disabledMarka: false,
      disabledCCM: true,
      disabledModel: true,
      disabledYear: true,
      disabledAntrieb: true,
      disabledSubmit: true
   };

   constructor(props) {
      super(props);
   }

   componentWillMount() {
      this.getMarkaData();
      //this.getModelData();
   }

   getMarkaData = () => {
      var url = baseApiUrl + 'filter/marka_data';
      fetch(url)
         .then(checkStatus)
         .then(returnJSON)
         .then(data => {
            this.setState({ markaOptions: data });
         });
   }

   resetForm() {
      this.setState({
         ccm: '',
         model: '',
         year: '',
         antrieb: '',
         disabledCCM: true,
         disabledModel: true,
         disabledYear: true,
         disabledAntrieb: true
      });
   };

   getModelData(query) {
      document.getElementById('vehicle_form_wrapper').classList.add('loading');

      fetch(baseApiUrl + 'filter/model_data?'+query)
         .then(checkStatus)
         .then(returnJSON)
         .then(data => {
            this.setState({ selectOptions: data.vehicle }, () => {
               document.getElementById('vehicle_form_wrapper').classList.remove('loading');
            });
         });
   };

   handleSelect(name, val) {

      switch (name) {
         case 'marka':
            this.resetForm();
            this.setState({
               marka: val.value,
               disabledCCM: false,
               disabledModel: true,
               disabledYear: true,
               disabledAntrieb: true
            }, this.getModelData('marka='+val.value));
            break;
         case 'ccm':
            this.setState({
               ccm: val.value,
               disabledModel: false,
               disabledYear: true,
               disabledAntrieb: true
            }, this.getModelData('marka='+this.state.marka+'&ccm='+val.value));
            break;
         case 'model':
            this.setState({
               model: val.value,
               disabledYear: false,
               disabledAntrieb: true
            }, this.getModelData('marka='+this.state.marka+'&ccm='+this.state.ccm+'&model='+val.value));
            break;
         case 'year':
            this.setState({
               year: val.value,
               disabledAntrieb: false
            }, this.getModelData('marka='+this.state.marka+'&ccm='+this.state.ccm+'&model='+this.state.model+'&year='+val.value));
            break;
         case 'antrieb':
            this.setState({ antrieb: val.value, disabledSubmit: false });
            break;
      }
   }

   submitValues = (e) => {

      e.preventDefault();
      let formParams = $("#vehicle_form").serialize();

      window.location = baseUrl+'filter?'+formParams;
      // if(window.location.pathname == basePath+"filter") {
      //    browserHistory.push(basePath+"filter?"+formParams);
      //    $("body").animate({ scrollTop:0 });
      // } else {
      //    window.location = baseUrl+'filter?'+formParams;
      // }
   };

   render() {

      let { marka, ccm, model, year, antrieb } = this.state;

      return (
         <div id="vehicle_form_wrapper" className="selects clearfix">
            <form id="vehicle_form" className="panel_width clearfix" name="vehicle">

                  <div className="col-lg-12">

                     <div className="row">
                        <Selekt
                           onChange={this.handleSelect.bind(this,'marka')}
                           value={this.state.marka}
                           name="marka"
                           options={this.state.markaOptions}
                           id="1" searchable={false}
                           placeholder="Motorradhelsteller"
                           disabled={this.state.disabledMarka}
                           className="selekt" />
                     </div>

                     <div className="row">
                        <Selekt
                           onChange={this.handleSelect.bind(this,'ccm')}
                           value={this.state.ccm}
                           name="ccm"
                           options={this.state.selectOptions.ccm}
                           id="1" searchable={false}
                           placeholder="Hubraum"
                           disabled={this.state.disabledCCM}
                           className="selekt" />
                     </div>

                     <div className="row">
                        <Selekt
                           onChange={this.handleSelect.bind(this,'model')}
                           value={this.state.model}
                           name="model"
                           options={this.state.selectOptions.model}
                           id="1" searchable={false}
                           placeholder="Modell"
                           disabled={this.state.disabledModel}
                           className="selekt" />
                     </div>

                     <div className="row">
                        <Selekt
                           onChange={this.handleSelect.bind(this,'year')}
                           value={this.state.year}
                           name="year"
                           options={this.state.selectOptions.year}
                           id="1" searchable={false}
                           placeholder="Jahr"
                           disabled={this.state.disabledYear}
                           className="selekt" />
                     </div>

                     <div className="row">
                        <Selekt
                           onChange={this.handleSelect.bind(this,'antrieb')}
                           value={this.state.antrieb}
                           name="antrieb"
                           options={this.state.antriebOptions}
                           id="1" searchable={false}
                           placeholder="Antrieb"
                           disabled={this.state.disabledAntrieb}
                           className="selekt" />
                     </div>

                  </div>

                  <input type="hidden" name="filter" value="vehicle" />

            </form>

            <button type="submit"
               onClick={this.submitValues}
               disabled={this.state.disabledSubmit}
               className="btn btn-default btn-lg btn-submit">
                  Search
            </button>

         </div>
      );
   }
}
