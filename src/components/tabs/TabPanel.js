import React, { PropTypes, Component } from 'react';

export default class TabPanel extends Component {

   static propTypes = {
      index: PropTypes.number
   };

   static defaultProps = {
      index: 0
   };

   state = {
   };

   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className="tab_panel">
            {this.props.children}
         </div>
      );
   }
}
