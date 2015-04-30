/**
*
* @project Inspire
* @date 3.2015
* @author  Daniela Valero, Sapient GmbH
* @licensor  Publicis Sapient
* @site Inspire
*/
'use strict';

import React from 'react';
import './Navbar.scss';

export default React.createClass({

   render: function() {
    return (
      <nav className="Navbar" role="navigation">
          <a className="Navbar-Brand u-negative-link" href="/">
            <img src={require('./logo-small.png')} height="50" alt="Sapient" />
            <h5 className="Navbar-Brand-Name">Inspire</h5>
          </a>
      </nav>
    );
  }
});
