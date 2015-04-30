/**
*
* @project Inspire
* @date 3.2015
* @author  Daniela Valero, Sapient GmbH
* @licensor  Publicis Sapient
* @site Inspire
*/

'use strict';

import './InspireEditor.scss';

import React from 'react';

import Footer from '../Footer';

import ItemEditor from './ItemEditor';
import SlidesView from './SlidesView';
import TemplateDeck from './TemplateDeck';
import Toolbar from './Toolbar';
import SlideEditor from './SlideEditor';

export default React.createClass({
    render() {
        return (
            /* jshint ignore:start */
            <section className = "InspireEditor">
              <Toolbar/>
              <SlideEditor className="CenterArea"/>
              <section className="LeftToolbar">
                <SlidesView/>
              </section>
              <section className="RightToolbar">
                <ItemEditor className="RightToolbar-TopElement"/>
                <TemplateDeck className="RightToolbar-BottomElement"/>
              </section>
              <Footer/>
            </section>
            /* jshint ignore:end */
        );
    }
});

