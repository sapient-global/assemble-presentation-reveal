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

import './App.scss';

import React from 'react';
import settings from '../../constants/Settings';
import invariant from 'react/lib/invariant';
import NavigationMixin from './NavigationMixin';
import AppStore from '../../stores/AppStore';
import Header from '../Header';
import Footer from '../Footer';
import ContentArea from '../ContentArea';
import NotFoundPage from '../NotFoundPage';
import InspireEditor from '../InspireEditor';



export default React.createClass({

  mixins: [NavigationMixin],

  propTypes: {
    path: React.PropTypes.string.isRequired,
    onSetTitle: React.PropTypes.func.isRequired,
    onSetMeta: React.PropTypes.func.isRequired,
    onPageNotFound: React.PropTypes.func.isRequired
  },

  render() {
    var page = AppStore.getPage(this.props.path);
    invariant(page !== undefined, 'Failed to load page content.');
    this.props.onSetTitle(page.title);
    if (page.type === 'notfound') {
      this.props.onPageNotFound();
     // return React.createElement(NotFoundPage, page);
    }

    if (page.type === 'editor') {
      this.props.onPageNotFound();
      return React.createElement(InspireEditor, page);
    }

    return (
      <div className="App">
       <Header/>
       {
         (page.type === "editor") ?
         <InspireEditor/>
         :
         <ContentArea className="" {...page}/>
        }
        <Footer/>
      </div>
    );
  }
});
