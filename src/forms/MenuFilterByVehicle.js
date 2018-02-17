import React, { PropTypes, Component } from 'react';

import Selekt from 'react-select';

import { baseApiUrl, checkStatus, returnJSON } from '../lib/constants';

export default class MenuFilterByVehicle extends Component {

   static propTypes = {
      submitFilters: PropTypes.func
   };

   static defaultProps = {
   };

   state = {
      selectOptions: [],
      breite: '',
      hoehe: '',
      zoll: ''
   };

   constructor(props) {
      super(props);
   }

   componentWillMount() {
      this.getSelectData();
   }

   getSelectData = () => {
      var url = baseApiUrl + 'attributes/for_select';
      fetch(url)
         .then(checkStatus)
         .then(returnJSON)
         .then(data => {
            this.setState({ selectOptions: data });
         });
   };

   handleBreite = (e) => {
      this.setState({ breite: e.value });
   };

   handleHoehe = (e) => {
      this.setState({ hoehe: e.value });
   };

   handleZoll = (e) => {
      this.setState({ zoll: e.value });
   };

   submitValues = () => {
      var vals = [this.state.breite, this.state.hoehe, this.state.zoll];
      this.props.submitFilters(vals);
   };

   render() {

      return (
         <div>
            <div id="vehicle_form_wrapper" className="selects clearfix">
               <form id="vehicle_form" name="vehicle">

                  <div className="left">
                     <Selekt
                        onChange={this.handleBreite}
                        value={this.state.breite}
                        options={this.state.selectOptions.breite}
                        id="1" searchable={false}
                        placeholder="Width"
                        className="selekt" />

                     <Selekt
                        onChange={this.handleBreite}
                        value={this.state.breite}
                        options={this.state.selectOptions.breite}
                        id="1" searchable={false}
                        placeholder="Width"
                        className="selekt" />
                  </div>

                  <div className="right">
                     <Selekt
                        onChange={this.handleBreite}
                        value={this.state.breite}
                        options={this.state.selectOptions.breite}
                        id="1" searchable={false}
                        placeholder="Width"
                        className="selekt" />

                     <Selekt
                        onChange={this.handleBreite}
                        value={this.state.breite}
                        options={this.state.selectOptions.breite}
                        id="1" searchable={false}
                        placeholder="Width"
                        className="selekt" />
                  </div>

               </form>
            </div>

            <button
               type="submit"
               onClick={this.submitValues}
               className="btn btn-default btn-lg btn-submit">
                  Offerte Anfordern
            </button>

         </div>
      );
   }
}
