/**
*
* @project Inspire
* @date 3.2015
* @author  Daniela Valero, Sapient GmbH
* @licensor  Publicis Sapient
* @site Inspire
*/
'use strict';

//import './SlideEditor.scss';

import React from 'react';


export default React.createClass({
  propTypes: {
    className: React.PropTypes.string.isRequired
  },
  render() {
    var { className } = this.props;
    return <div className={'SlideEditor ' + className} />;
  }
});
