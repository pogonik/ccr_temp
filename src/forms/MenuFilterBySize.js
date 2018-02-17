import React, { PropTypes, Component } from 'react';

import Select from 'react-select';

import { Tire } from '../svg/Icons';

import { baseApiUrl, checkStatus, returnJSON } from '../lib/constants';

export default class MenuFilterBySize extends Component {

   static propTypes = {
   };

   static defaultProps = {
   };

   state = {
      breite: null,
      hoehe: null,
      zoll: null
   };

   constructor(props) {
      super(props);
   }

   // componentWillMount() {
   //    this.getSelectData();
   // }
   //
   // getSelectData = () => {
   //    var url = baseApiUrl + 'attributes/for_select';
   //    fetch(url)
   //       .then(checkStatus)
   //       .then(returnJSON)
   //       .then(data => {
   //          this.setState({ options: data });
   //       });
   // };

   handleSelect = (name, val) => {
      this.setState({ [name]: val.value });
   };

   render() {
      return (
         <div id="size_form_wrapper" className="selects clearfix">
            <div className="select_wrapper clearfix">
               <Select
                  onChange={this.handleSelect.bind(this, 'breite')}
                  value={this.state.breite}
                  options={this.props.options.breite}
                  searchable={false} clearable={false}
                  name="breite" placeholder="Breite"
                  className="selekt" />
               <Tire id="tire" colors={["#ff4500","#666","#666"]} />
            </div>

            <div className="select_wrapper clearfix">
               <Select
                  onChange={this.handleSelect.bind(this, 'hoehe')}
                  value={this.state.hoehe}
                  options={this.props.options.hoehe}
                  searchable={false} clearable={false}
                  name="hoehe" placeholder="Höehe"
                  className="selekt" />
               <Tire id="tire" colors={["#666","#ff4500","#666"]} />
            </div>

            <div className="select_wrapper clearfix">
               <Select
                  onChange={this.handleSelect.bind(this, 'zoll')}
                  value={this.state.zoll}
                  options={this.props.options.zoll}
                  searchable={false} clearable={false}
                  name="zoll" placeholder="Zoll"
                  className="selekt selekt-last" />
               <Tire id="tire" colors={["#666","#666","#ff4500"]} />
            </div>
         </div>
      );
   }
}
