import React, { PropTypes, Component } from 'react';

export default class TabNav extends Component {

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
         <nav className="tab_nav">
            {this.props.children}
         </nav>
      );
   }
}
