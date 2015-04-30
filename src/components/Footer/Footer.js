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
import './Footer.scss';

export default React.createClass({

  render: function() {
    return (
      <footer className="Footer">
        <nav className="Navbar NavbarFooter u-padding-content">
            <ul>
              <li><a className="u-negative-link" href="/">Home</a></li>
              <li><a className="u-negative-link" href="/inspireEditor">Inspire Editor</a></li>
              <li><a className="u-negative-link" href="/privacy">Privacy</a></li>
              <li><a className="u-negative-link" href="/about">About</a></li>
            </ul>
            <div className="Footer-Copyright">
              <span>© Sapient Nitro</span>
            </div>
        </nav>
        </footer>
    );
  }

});
