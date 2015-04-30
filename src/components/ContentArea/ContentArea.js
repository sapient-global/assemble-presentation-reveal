/**
*
* @project Inspire
* @date 3.2015
* @author  Daniela Valero, Sapient GmbH
* @licensor  Publicis Sapient
* @site Inspire
*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import React from 'react';
import "./ContentArea.scss";

export default React.createClass({

  propTypes: {
    body: React.PropTypes.string.isRequired
  },

  render() {
    var { className, body, other } = this.props;

    return <div className={'ContentArea' + className}
      dangerouslySetInnerHTML={{__html: body}} {...other} />;
  }

});
