/**
*
* @project Inspire
* @date 3.2015
* @author  Daniela Valero, Sapient GmbH
* @licensor  Publicis Sapient
* @site Inspire
*/

'use strict';

import './TemplateDeck.scss';
import React from 'react';

export default  React.createClass({
   propTypes: {
    className: React.PropTypes.string.isRequired
  },
    render() {
      var { className } = this.props;
        return (
            /* jshint ignore:start */
            <section className={'TemplateDeck ' + className} > </section>
            /* jshint ignore:end */
        );
    }
});
