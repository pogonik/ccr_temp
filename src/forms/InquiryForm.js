import React, { PropTypes, Component } from 'react';

import Select from 'react-select';
import Spinner from '../components/Spinner';

import { basePath, baseUrl, baseApiUrl, checkStatus, returnJSON, validateEmail } from '../lib/constants';

let reifenOptions = [
   { value: 'Winterreifen', label: 'Winterreifen' },
   { value: 'Sommerreifen', label: 'Sommerreifen' },
   { value: 'Ganzjahresreifen', label: 'Ganzjahresreifen' }
];

let brandOptions = [
   { value: 'Dunlop', label: 'Dunlop' },
   { value: 'Michelin', label: 'Michelin' },
   { value: 'Continental', label: 'Continental' },
   { value: 'Pirelli', label: 'Pirelli' },
   { value: 'Firestone', label: 'Firestone' },
   { value: 'Nokian', label: 'Nokian' }
];

export default class InquiryForm extends Component {

   static propTypes = {
   };

   static defaultProps = {
   };

   state = {
      options:[],
      breite:'',
      hoehe:'',
      zoll:'',
      brands:null,
      reifenart:null,
      name:'',
      phone:'',
      email:'',
      loading: false,
      errorFields: [],
      slide: 1
   };

   constructor(props) {
      super(props);
   }

   resetForm() {
      this.setState({
         breite:'',
         hoehe:'',
         zoll:'',
         brands:null,
         reifenart:null,
         name:'',
         phone:'',
         email:'',
         errorFields: [],
         slide: 1,
         loading: false
      }, () => {
         $('#inquiry_form .contact_info').removeClass('show');
      });
   }

   validateForm() {

      let errorFields = [];

      $('#inquiry_form .error').removeClass('error');

      let states = ['breite', 'hoehe', 'zoll', 'brands', 'reifenart'];
      if(this.state.slide === 2) {
         states = ['name', 'phone', 'email'];
      }

      let valid = true;
      let mail = true;

      _.map(states, key => {
         if(this.state[key] === null || this.state[key] === '') {
            errorFields.push(key);
            $('#inquiry_form .'+key).addClass('error');
            this.setState({ errorFields });
            valid = false;
         }
         if(this.state.slide === 2 && key === 'email' && errorFields.indexOf('email') === -1 && validateEmail(this.state[key]) === false) {
            errorFields.push('email');
            $('#inquiry_form .email').addClass('error');
            this.setState({ errorFields });
            mail = false;
         }
      });

      if(!valid) {
         toastr.info('All fields are required!');
         return false;
      } else if(!mail) {
         toastr.info('Email address is incorrect!');
         return false;
      } else {
         return true;
      }
   }



   handleSelect = (name, val) => {
      this.checkFieldForError(name, val);

      if(val === null)
         this.setState({ [name]: val, loading: true });
      else
         this.setState({ [name]: val.value, loading: true });
   }

   handleMultiSelect = (name, val) => {
      this.checkFieldForError(name, val);
      this.setState({ [name]: val });
   }

   handleInput = (name, val) => {
      this.checkFieldForError(name, val.target.value);
      this.setState({ [name]: val.target.value });
   }

   nextSlide = (e) => {
      e.preventDefault();
      if(this.validateForm()) {
         this.setState({ slide: 2 });
         $('#inquiry_form .contact_info').addClass('show');
      }
   }

   checkFieldForError(name, val) {
      if(val !== null && this.state.errorFields.indexOf(name) !== -1) {
         let { errorFields } = this.state;
         this.setState({ errorFields: _.without(errorFields, name) });
         $('#inquiry_form .'+name).removeClass('error');
      }
   }

   submitValues = (e) => {

      e.preventDefault();

      if(this.validateForm()) {
         this.setState({ loading: true });

         let forma = document.getElementById('inquiry_form');
         let formData = new FormData(forma);

         fetch(basePath+'index.php?route=api/autoreifen', {
            credentials: "same-origin",
            method: 'POST',
            body: formData
         })
         .then(checkStatus).then(returnJSON)
         .then(data => {
            if(data) {
               this.setState({ loading: false });
               toastr.info('Thank you for your interest.<br/>Your message has been succesfully sent!');
               this.resetForm();
            }
         });
      }

   };

   render() {

      // let spinner = this.state.loading ? <Spinner /> : '';
      // let klasa = this.state.loading ? 'clearfix loading' : 'clearfix';

      return (
         <form id="inquiry_form" name="inquiry" className="clearfix">

               <h3 className="title">JETZT AUTOREIFEN-OFFERTE ANFORDERN</h3>
               <div className="left">
                  <label>Breite</label>
                  <input type="text" placeholder="195"
                     value={this.state.breite}
                     onChange={this.handleInput.bind(this,'breite')}
                     name="breite" className="form-control breite text" />


                  <label>Zoll</label>
                  <input type="text" placeholder="16"
                     value={this.state.zoll}
                     onChange={this.handleInput.bind(this,'zoll')}
                     name="zoll" className="form-control zoll text" />


                  <label>Marken</label>
                  <Select clearable={false} multi={true} joinValues={true}
                     onChange={this.handleMultiSelect.bind(this,'brands')}
                     options={brandOptions}
                     value={this.state.brands}
                     backspaceToRemoveMessage=""
                     placeholder="Marken" name="brands"
                     className="selekt brands selekt-last" />
               </div>

               <div className="right">

                  <label>Höehe</label>
                  <input type="text" placeholder="65"
                     value={this.state.hoehe}
                     onChange={this.handleInput.bind(this,'hoehe')}
                     name="hoehe" className="form-control hoehe text" />

                  <label>Reifenart</label>
                  <Select clearable={false}
                     onChange={this.handleSelect.bind(this,'reifenart')}
                     options={reifenOptions}
                     value={this.state.reifenart}
                     placeholder="Reifenart" name="atts[reifenart]"
                     className="selekt reifenart" />

                  <button type="submit" className="btn btn-lg btn-primary submit" onClick={this.nextSlide.bind(this)}>Offerte anfordern</button>
               </div>



            <div className="contact_info">
               <div className="inner">
                  <div className="form-group">
                     <input type="text" name="name"
                        value={this.state.name}
                        onChange={this.handleInput.bind(this,'name')}
                        placeholder="Name and Lastname" className="form-control name text" />
                  </div>
                  <div className="form-group">
                     <input type="text" name="phone"
                        value={this.state.phone}
                        onChange={this.handleInput.bind(this,'phone')}
                        placeholder="Phone" className="form-control phone text" />
                  </div>
                  <div className="form-group">
                     <input type="email" name="email"
                        value={this.state.email}
                        onChange={this.handleInput.bind(this,'email')}
                        placeholder="Email" className="form-control email text" />
                  </div>
                  <div className="form-group text-center">
                     <button type="submit"
                        onClick={this.submitValues.bind(this)}
                        className="btn btn-default btn-lg btn-submit">Senden</button>
                  </div>
               </div>
            </div>

         </form>
      );
   }
}
