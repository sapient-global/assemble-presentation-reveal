/**
*
* @project Inspire
* @date 3.2015
* @author  Daniela Valero, Sapient GmbH
* @licensor  Publicis Sapient
* @site Inspire
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ContentArea from '../ContentArea';

export default React.createClass({

  render: function() {
     return (
      <div className="App">
        <Header/>
        <section className="Content">
          <ContentArea className="Content-Container"/>
          </section>
        <Footer/>
      </div>
    );
  }
});
