module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var _ = _interopRequire(__webpack_require__(41));
  
  var fs = _interopRequire(__webpack_require__(39));
  
  var path = _interopRequire(__webpack_require__(42));
  
  var express = _interopRequire(__webpack_require__(36));
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Dispatcher = _interopRequire(__webpack_require__(4));
  
  var ActionTypes = _interopRequire(__webpack_require__(3));
  
  var AppStore = _interopRequire(__webpack_require__(9));
  
  var server = express();
  
  server.set("port", process.env.PORT || 5000);
  server.use(express["static"](path.join(__dirname)));
  
  //
  // Page API
  // -----------------------------------------------------------------------------
  server.get("/api/page/*", function (req, res) {
    var urlPath = req.path.substr(9);
    var page = AppStore.getPage(urlPath);
    res.send(page);
  });
  
  //
  // Server-side rendering
  // -----------------------------------------------------------------------------
  
  // The top-level React component + HTML template for it
  var App = React.createFactory(__webpack_require__(14));
  var templateFile = path.join(__dirname, "templates/index.html");
  var template = _.template(fs.readFileSync(templateFile, "utf8"));
  
  server.get("*", function (req, res) {
    var data = { description: "" };
    var app = new App({
      path: req.path,
      onSetTitle: function onSetTitle(title) {
        data.title = title;
      },
      onSetMeta: function onSetMeta(name, content) {
        data[name] = content;
      },
      onPageNotFound: function onPageNotFound() {
        res.status(404);
      }
    });
    data.body = React.renderToString(app);
    var html = template(data);
    res.send(html);
  });
  
  // Load pages from the `/src/content/` folder into the AppStore
  (function () {
    var assign = __webpack_require__(5);
    var fm = __webpack_require__(38);
    var jade = __webpack_require__(40);
    var sourceDir = path.join(__dirname, "./content");
    var getFiles = (function (_getFiles) {
      var _getFilesWrapper = function getFiles(_x) {
        return _getFiles.apply(this, arguments);
      };
  
      _getFilesWrapper.toString = function () {
        return _getFiles.toString();
      };
  
      return _getFilesWrapper;
    })(function (dir) {
      var pages = [];
      fs.readdirSync(dir).forEach(function (file) {
        var stat = fs.statSync(path.join(dir, file));
        if (stat && stat.isDirectory()) {
          pages = pages.concat(getFiles(file));
        } else {
          // Convert the file to a Page object
          var filename = path.join(dir, file);
          var url = filename.substr(sourceDir.length, filename.length - sourceDir.length - 5).replace("\\", "/");
          if (url.indexOf("/index", url.length - 6) !== -1) {
            url = url.substr(0, url.length - (url.length > 6 ? 6 : 5));
          }
          var source = fs.readFileSync(filename, "utf8");
          var content = fm(source);
          var html = jade.render(content.body, null, "  ");
          var page = assign({}, { path: url, body: html }, content.attributes);
          Dispatcher.handleServerAction({
            actionType: ActionTypes.LOAD_PAGE,
            path: url,
            page: page
          });
        }
      });
      return pages;
    });
    return getFiles(sourceDir);
  })();
  
  server.listen(server.get("port"), function () {
    if (process.send) {
      process.send("online");
    } else {
      console.log("The server is running at http://localhost:" + server.get("port"));
    }
  });
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  __webpack_require__(27);
  
  module.exports = React.createClass({
    displayName: "Footer",
  
    render: function render() {
      return React.createElement(
        "footer",
        { className: "Footer" },
        React.createElement(
          "nav",
          { className: "Navbar NavbarFooter u-padding-content" },
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { className: "u-negative-link", href: "/" },
                "Home"
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { className: "u-negative-link", href: "/inspireEditor" },
                "Inspire Editor"
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { className: "u-negative-link", href: "/privacy" },
                "Privacy"
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { className: "u-negative-link", href: "/about" },
                "About"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "Footer-Copyright" },
            React.createElement(
              "span",
              null,
              "© Sapient Nitro"
            )
          )
        )
      );
    }
  
  });
  /**
  *
  * @project Inspire
  * @date 3.2015
  * @author  Daniela Valero, Sapient GmbH
  * @licensor  Publicis Sapient
  * @site Inspire
  */

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var keyMirror = _interopRequire(__webpack_require__(12));
  
  var ActionTypes = keyMirror({
  
    LOAD_PAGE: null,
    LOAD_PAGE_SUCCESS: null,
    LOAD_PAGE_ERROR: null,
    CHANGE_LOCATION: null
  
  });
  
  module.exports = ActionTypes;
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var Flux = _interopRequire(__webpack_require__(37));
  
  var PayloadSources = _interopRequire(__webpack_require__(8));
  
  var assign = _interopRequire(__webpack_require__(5));
  
  /**
   * A singleton that operates as the central hub for application updates.
   * For more information visit https://facebook.github.io/flux/
   */
  var Dispatcher = assign(new Flux.Dispatcher(), {
  
    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the server.
     */
    handleServerAction: function handleServerAction(action) {
      var payload = {
        source: PayloadSources.SERVER_ACTION,
        action: action
      };
      this.dispatch(payload);
    },
  
    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the view.
     */
    handleViewAction: function handleViewAction(action) {
      var payload = {
        source: PayloadSources.VIEW_ACTION,
        action: action
      };
      this.dispatch(payload);
    }
  
  });
  
  module.exports = Dispatcher;
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule Object.assign
   */
  
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
  
  function assign(target, sources) {
    if (target == null) {
      throw new TypeError('Object.assign target cannot be null or undefined');
    }
  
    var to = Object(target);
    var hasOwnProperty = Object.prototype.hasOwnProperty;
  
    for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
      var nextSource = arguments[nextIndex];
      if (nextSource == null) {
        continue;
      }
  
      var from = Object(nextSource);
  
      // We don't currently support accessors nor proxies. Therefore this
      // copy cannot throw. If we ever supported this then we must handle
      // exceptions and side-effects. We don't support symbols so they won't
      // be transferred.
  
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
    }
  
    return to;
  };
  
  module.exports = assign;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  __webpack_require__(26);
  
  module.exports = React.createClass({
    displayName: "ContentArea",
  
    propTypes: {
      body: React.PropTypes.string.isRequired
    },
  
    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var body = _props.body;
      var other = _props.other;
  
      return React.createElement("div", _extends({ className: "ContentArea" + className,
        dangerouslySetInnerHTML: { __html: body } }, other));
    }
  
  });
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Navbar = _interopRequire(__webpack_require__(22));
  
  module.exports = React.createClass({
      displayName: "Header",
  
      render: function render() {
          return React.createElement(
              "header",
              null,
              React.createElement(Navbar, null)
          );
      }
  });

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var keyMirror = _interopRequire(__webpack_require__(12));
  
  var PayloadSources = keyMirror({
  
    VIEW_ACTION: null,
    SERVER_ACTION: null
  
  });
  
  module.exports = PayloadSources;
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var Dispatcher = _interopRequire(__webpack_require__(4));
  
  var ActionTypes = _interopRequire(__webpack_require__(3));
  
  var PayloadSources = _interopRequire(__webpack_require__(8));
  
  var EventEmitter = _interopRequire(__webpack_require__(35));
  
  var assign = _interopRequire(__webpack_require__(5));
  
  var CHANGE_EVENT = "change";
  
  var pages = {};
  var loading = false;
  
  if (true) {
    pages["/"] = { title: "Home Page" };
    pages["/inspireEditor"] = { title: "Inspire editor", type: "editor" };
  }
  
  var AppStore = assign({}, EventEmitter.prototype, {
  
    isLoading: function isLoading() {
      return loading;
    },
  
    /**
     * Gets page data by the given URL path.
     *
     * @param {String} path URL path.
     * @returns {*} Page data.
     */
    getPage: function getPage(path) {
      return path in pages ? pages[path] : {
        title: "Page Not Found",
        type: "notfound"
      };
    },
  
    /**
     * Emits change event to all registered event listeners.
     *
     * @returns {Boolean} Indication if we've emitted an event.
     */
    emitChange: function emitChange() {
      return this.emit(CHANGE_EVENT);
    },
  
    /**
     * Register a new change event listener.
     *
     * @param {function} callback Callback function.
     */
    onChange: function onChange(callback) {
      this.on(CHANGE_EVENT, callback);
    },
  
    /**
     * Remove change event listener.
     *
     * @param {function} callback Callback function.
     */
    off: function off(callback) {
      this.off(CHANGE_EVENT, callback);
    }
  
  });
  
  AppStore.dispatcherToken = Dispatcher.register(function (payload) {
    var action = payload.action;
  
    switch (action.actionType) {
  
      case ActionTypes.LOAD_PAGE:
        if (action.source === PayloadSources.VIEW_ACTION) {
          loading = true;
        } else {
          loading = false;
          if (!action.err) {
            pages[action.path] = action.page;
          }
        }
        AppStore.emitChange();
        break;
  
      default:
      // Do nothing
  
    }
  });
  
  module.exports = AppStore;
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ExecutionEnvironment
   */
  
  /*jslint evil: true */
  
  "use strict";
  
  var canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
  
  /**
   * Simple, lightweight module assisting with the detection and context of
   * Worker. Helps avoid circular dependencies and allows code to reason about
   * whether or not they are in a Worker, even if they never include the main
   * `ReactWorker` dependency.
   */
  var ExecutionEnvironment = {
  
    canUseDOM: canUseDOM,
  
    canUseWorkers: typeof Worker !== 'undefined',
  
    canUseEventListeners:
      canUseDOM && !!(window.addEventListener || window.attachEvent),
  
    canUseViewport: canUseDOM && !!window.screen,
  
    isInWorker: !canUseDOM // For now, this is true - might change in the future.
  
  };
  
  module.exports = ExecutionEnvironment;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule invariant
   */
  
  "use strict";
  
  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */
  
  var invariant = function(condition, format, a, b, c, d, e, f) {
    if (true) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }
  
    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
        );
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(
          'Invariant Violation: ' +
          format.replace(/%s/g, function() { return args[argIndex++]; })
        );
      }
  
      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };
  
  module.exports = invariant;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Copyright 2013-2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule keyMirror
   * @typechecks static-only
   */
  
  "use strict";
  
  var invariant = __webpack_require__(11);
  
  /**
   * Constructs an enumeration with keys equal to their value.
   *
   * For example:
   *
   *   var COLORS = keyMirror({blue: null, red: null});
   *   var myColor = COLORS.blue;
   *   var isColorValid = !!COLORS[myColor];
   *
   * The last line could not be performed if the values of the generated enum were
   * not equal to their keys.
   *
   *   Input:  {key1: val1, key2: val2}
   *   Output: {key1: key1, key2: key2}
   *
   * @param {object} obj
   * @return {object}
   */
  var keyMirror = function(obj) {
    var ret = {};
    var key;
    (true ? invariant(
      obj instanceof Object && !Array.isArray(obj),
      'keyMirror(...): Argument must be an object.'
    ) : invariant(obj instanceof Object && !Array.isArray(obj)));
    for (key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      ret[key] = key;
    }
    return ret;
  };
  
  module.exports = keyMirror;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var Dispatcher = _interopRequire(__webpack_require__(4));
  
  var ActionTypes = _interopRequire(__webpack_require__(3));
  
  var ExecutionEnvironment = _interopRequire(__webpack_require__(10));
  
  var http = _interopRequire(__webpack_require__(43));
  
  module.exports = {
  
    navigateTo: function navigateTo(path) {
      if (ExecutionEnvironment.canUseDOM) {
        window.history.pushState({}, document.title, path);
      }
  
      Dispatcher.handleViewAction({
        actionType: ActionTypes.CHANGE_LOCATION, path: path
      });
    },
  
    loadPage: function loadPage(path, cb) {
      Dispatcher.handleViewAction({
        actionType: ActionTypes.LOAD_PAGE, path: path
      });
  
      http.get("/api/page" + path).accept("application/json").end(function (err, res) {
        Dispatcher.handleServerAction({
          actionType: ActionTypes.LOAD_PAGE, path: path, err: err, page: res.body
        });
        if (cb) {
          cb();
        }
      });
    }
  
  };
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  __webpack_require__(25);
  
  var React = _interopRequire(__webpack_require__(1));
  
  var settings = _interopRequire(__webpack_require__(24));
  
  var invariant = _interopRequire(__webpack_require__(11));
  
  var NavigationMixin = _interopRequire(__webpack_require__(15));
  
  var AppStore = _interopRequire(__webpack_require__(9));
  
  var Header = _interopRequire(__webpack_require__(7));
  
  var Footer = _interopRequire(__webpack_require__(2));
  
  var ContentArea = _interopRequire(__webpack_require__(6));
  
  var NotFoundPage = _interopRequire(__webpack_require__(23));
  
  var InspireEditor = _interopRequire(__webpack_require__(16));
  
  module.exports = React.createClass({
    displayName: "App",
  
    mixins: [NavigationMixin],
  
    propTypes: {
      path: React.PropTypes.string.isRequired,
      onSetTitle: React.PropTypes.func.isRequired,
      onSetMeta: React.PropTypes.func.isRequired,
      onPageNotFound: React.PropTypes.func.isRequired
    },
  
    render: function render() {
      var page = AppStore.getPage(this.props.path);
      invariant(page !== undefined, "Failed to load page content.");
      this.props.onSetTitle(page.title);
      if (page.type === "notfound") {
        this.props.onPageNotFound();
        // return React.createElement(NotFoundPage, page);
      }
  
      if (page.type === "editor") {
        this.props.onPageNotFound();
        return React.createElement(InspireEditor, page);
      }
  
      return React.createElement(
        "div",
        { className: "App" },
        React.createElement(Header, null),
        page.type === "editor" ? React.createElement(InspireEditor, null) : React.createElement(ContentArea, _extends({ className: "" }, page)),
        React.createElement(Footer, null)
      );
    }
  });
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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var ExecutionEnvironment = _interopRequire(__webpack_require__(10));
  
  var AppActions = _interopRequire(__webpack_require__(13));
  
  var NavigationMixin = {
  
    componentDidMount: function componentDidMount() {
      if (ExecutionEnvironment.canUseDOM) {
        window.addEventListener("popstate", this.handlePopState);
        window.addEventListener("click", this.handleClick);
      }
    },
  
    componentWillUnmount: function componentWillUnmount() {
      window.removeEventListener("popstate", this.handlePopState);
      window.removeEventListener("click", this.handleClick);
    },
  
    handlePopState: function handlePopState(event) {
      //if (event.state) {
      //  TODO: Replace current location
      //  var path = event.state.path;
      //  replace(path, event.state);
      //}
      if (!event.state) {
        AppActions.navigateTo(window.location.pathname);
      }
    },
  
    handleClick: function handleClick(event) {
      if (event.button === 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.defaultPrevented) {
        return;
      }
  
      // Ensure link
      var el = event.target;
      while (el && el.nodeName !== "A") {
        el = el.parentNode;
      }
      if (!el || el.nodeName !== "A") {
        return;
      }
  
      // Ignore if tag has
      // 1. "download" attribute
      // 2. rel="external" attribute
      if (el.getAttribute("download") || el.getAttribute("rel") === "external") {
        return;
      }
  
      // Ensure non-hash for the same path
      var link = el.getAttribute("href");
      if (el.pathname === location.pathname && (el.hash || link === "#")) {
        return;
      }
  
      // Check for mailto: in the href
      if (link && link.indexOf("mailto:") > -1) {
        return;
      }
  
      // Check target
      if (el.target) {
        return;
      }
  
      // X-origin
      var origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
      if (!(el.href && el.href.indexOf(origin) === 0)) {
        return;
      }
  
      // Rebuild path
      var path = el.pathname + el.search + (el.hash || "");
  
      event.preventDefault();
      AppActions.loadPage(path, function () {
        AppActions.navigateTo(path);
      });
    }
  
  };
  
  module.exports = NavigationMixin;
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

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  __webpack_require__(28);
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Footer = _interopRequire(__webpack_require__(2));
  
  var ItemEditor = _interopRequire(__webpack_require__(17));
  
  var SlidesView = _interopRequire(__webpack_require__(19));
  
  var TemplateDeck = _interopRequire(__webpack_require__(20));
  
  var Toolbar = _interopRequire(__webpack_require__(21));
  
  var SlideEditor = _interopRequire(__webpack_require__(18));
  
  module.exports = React.createClass({
    displayName: "InspireEditor",
  
    render: function render() {
      return (
        /* jshint ignore:start */
        React.createElement(
          "section",
          { className: "InspireEditor" },
          React.createElement(Toolbar, null),
          React.createElement(SlideEditor, { className: "CenterArea" }),
          React.createElement(
            "section",
            { className: "LeftToolbar" },
            React.createElement(SlidesView, null)
          ),
          React.createElement(
            "section",
            { className: "RightToolbar" },
            React.createElement(ItemEditor, { className: "RightToolbar-TopElement" }),
            React.createElement(TemplateDeck, { className: "RightToolbar-BottomElement" })
          ),
          React.createElement(Footer, null)
        )
      );
    }
  });
  /**
  *
  * @project Inspire
  * @date 3.2015
  * @author  Daniela Valero, Sapient GmbH
  * @licensor  Publicis Sapient
  * @site Inspire
  */

  /* jshint ignore:end */

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  __webpack_require__(29);
  
  var React = _interopRequire(__webpack_require__(1));
  
  module.exports = React.createClass({
      displayName: "ItemEditor",
  
      propTypes: {
          className: React.PropTypes.string.isRequired
      },
      render: function render() {
          var className = this.props.className;
  
          return (
              /* jshint ignore:start */
              React.createElement(
                  "section",
                  { className: "ItemEditor " + className },
                  " "
              )
          );
      }
  });
  /**
  *
  * @project Inspire
  * @date 3.2015
  * @author  Daniela Valero, Sapient GmbH
  * @licensor  Publicis Sapient
  * @site Inspire
  */

  /* jshint ignore:end */

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  //import './SlideEditor.scss';
  
  var React = _interopRequire(__webpack_require__(1));
  
  module.exports = React.createClass({
    displayName: "SlideEditor",
  
    propTypes: {
      className: React.PropTypes.string.isRequired
    },
    render: function render() {
      var className = this.props.className;
  
      return React.createElement("div", { className: "SlideEditor " + className });
    }
  });
  /**
  *
  * @project Inspire
  * @date 3.2015
  * @author  Daniela Valero, Sapient GmbH
  * @licensor  Publicis Sapient
  * @site Inspire
  */

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  __webpack_require__(30);
  
  var React = _interopRequire(__webpack_require__(1));
  
  module.exports = React.createClass({
      displayName: "SlidesView",
  
      render: function render() {
          return (
              /* jshint ignore:start */
              React.createElement(
                  "section",
                  { className: "SlidesView" },
                  " "
              )
          );
      }
  });
  /**
  *
  * @project Inspire
  * @date 3.2015
  * @author  Daniela Valero, Sapient GmbH
  * @licensor  Publicis Sapient
  * @site Inspire
  */

  /* jshint ignore:end */

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  __webpack_require__(31);
  
  var React = _interopRequire(__webpack_require__(1));
  
  module.exports = React.createClass({
      displayName: "TemplateDeck",
  
      propTypes: {
          className: React.PropTypes.string.isRequired
      },
      render: function render() {
          var className = this.props.className;
  
          return (
              /* jshint ignore:start */
              React.createElement(
                  "section",
                  { className: "TemplateDeck " + className },
                  " "
              )
          );
      }
  });
  /**
  *
  * @project Inspire
  * @date 3.2015
  * @author  Daniela Valero, Sapient GmbH
  * @licensor  Publicis Sapient
  * @site Inspire
  */

  /* jshint ignore:end */

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  __webpack_require__(32);
  
  var React = _interopRequire(__webpack_require__(1));
  
  module.exports = React.createClass({
      displayName: "Toolbar",
  
      render: function render() {
          return (
              /* jshint ignore:start */
              React.createElement(
                  "section",
                  { className: "Toolbar Toolbar-shadow" },
                  React.createElement(
                      "h4",
                      null,
                      "Toolbar"
                  )
              )
          );
      }
  });
  /**
  *
  * @project Inspire
  * @date 3.2015
  * @author  Daniela Valero, Sapient GmbH
  * @licensor  Publicis Sapient
  * @site Inspire
  */

  /* jshint ignore:end */

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  __webpack_require__(33);
  
  module.exports = React.createClass({
    displayName: "Navbar",
  
    render: function render() {
      return React.createElement(
        "nav",
        { className: "Navbar", role: "navigation" },
        React.createElement(
          "a",
          { className: "Navbar-Brand u-negative-link", href: "/" },
          React.createElement("img", { src: __webpack_require__(34), height: "50", alt: "Sapient" }),
          React.createElement(
            "h5",
            { className: "Navbar-Brand-Name" },
            "Inspire"
          )
        )
      );
    }
  });
  /**
  *
  * @project Inspire
  * @date 3.2015
  * @author  Daniela Valero, Sapient GmbH
  * @licensor  Publicis Sapient
  * @site Inspire
  */

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
  
  var React = _interopRequire(__webpack_require__(1));
  
  var Header = _interopRequire(__webpack_require__(7));
  
  var Footer = _interopRequire(__webpack_require__(2));
  
  var ContentArea = _interopRequire(__webpack_require__(6));
  
  module.exports = React.createClass({
    displayName: "NotFoundPage",
  
    render: function render() {
      return React.createElement(
        "div",
        { className: "App" },
        React.createElement(Header, null),
        React.createElement(
          "section",
          { className: "Content" },
          React.createElement(ContentArea, { className: "Content-Container" })
        ),
        React.createElement(Footer, null)
      );
    }
  });
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

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  /*
   * React.js Starter Kit
   * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  module.exports = {
  
    defaults: {
      page: {
        title: "Inspire",
        description: "Web Editor to create web presentations",
        keywords: null
  
      }
    }
  
  };

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  // removed by extract-text-webpack-plugin

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  // removed by extract-text-webpack-plugin

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  // removed by extract-text-webpack-plugin

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  // removed by extract-text-webpack-plugin

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  // removed by extract-text-webpack-plugin

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  // removed by extract-text-webpack-plugin

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  // removed by extract-text-webpack-plugin

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  // removed by extract-text-webpack-plugin

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  // removed by extract-text-webpack-plugin

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "05862d634c97f52de40cfaa28ef413c9.png"

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("eventemitter3");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("express");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("flux");

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("front-matter");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("fs");

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("jade");

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("lodash");

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("path");

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = require("superagent");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzMxYWVlNzdmMTY1NmYzYzAzYjgiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvc2VydmVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyLmpzIiwid2VicGFjazovLy9EOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvc3JjL2NvbnN0YW50cy9BY3Rpb25UeXBlcy5qcyIsIndlYnBhY2s6Ly8vRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL3NyYy9jb3JlL0Rpc3BhdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL3NyYy9jb21wb25lbnRzL0NvbnRlbnRBcmVhL0NvbnRlbnRBcmVhLmpzIiwid2VicGFjazovLy9EOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvc3JjL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5qcyIsIndlYnBhY2s6Ly8vRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL3NyYy9jb25zdGFudHMvUGF5bG9hZFNvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvc3RvcmVzL0FwcFN0b3JlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2ludmFyaWFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9rZXlNaXJyb3IuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvYWN0aW9ucy9BcHBBY3Rpb25zLmpzIiwid2VicGFjazovLy9EOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qcyIsIndlYnBhY2s6Ly8vRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL3NyYy9jb21wb25lbnRzL0FwcC9OYXZpZ2F0aW9uTWl4aW4uanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvY29tcG9uZW50cy9JbnNwaXJlRWRpdG9yL0luc3BpcmVFZGl0b3IuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvY29tcG9uZW50cy9JbnNwaXJlRWRpdG9yL0l0ZW1FZGl0b3IvSXRlbUVkaXRvci5qcyIsIndlYnBhY2s6Ly8vRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL3NyYy9jb21wb25lbnRzL0luc3BpcmVFZGl0b3IvU2xpZGVFZGl0b3IvU2xpZGVFZGl0b3IuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvY29tcG9uZW50cy9JbnNwaXJlRWRpdG9yL1NsaWRlc1ZpZXcvU2xpZGVzVmlldy5qcyIsIndlYnBhY2s6Ly8vRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL3NyYy9jb21wb25lbnRzL0luc3BpcmVFZGl0b3IvVGVtcGxhdGVEZWNrL1RlbXBsYXRlRGVjay5qcyIsIndlYnBhY2s6Ly8vRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL3NyYy9jb21wb25lbnRzL0luc3BpcmVFZGl0b3IvVG9vbGJhci9Ub29sYmFyLmpzIiwid2VicGFjazovLy9EOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvc3JjL2NvbXBvbmVudHMvTmF2YmFyL05hdmJhci5qcyIsIndlYnBhY2s6Ly8vRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL3NyYy9jb21wb25lbnRzL05vdEZvdW5kUGFnZS9Ob3RGb3VuZFBhZ2UuanMiLCJ3ZWJwYWNrOi8vL0Q6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvY29uc3RhbnRzL1NldHRpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0FwcC9BcHAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Db250ZW50QXJlYS9Db250ZW50QXJlYS5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXIuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JbnNwaXJlRWRpdG9yL0luc3BpcmVFZGl0b3Iuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9JbnNwaXJlRWRpdG9yL0l0ZW1FZGl0b3IvSXRlbUVkaXRvci5zY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0luc3BpcmVFZGl0b3IvU2xpZGVzVmlldy9TbGlkZXNWaWV3LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW5zcGlyZUVkaXRvci9UZW1wbGF0ZURlY2svVGVtcGxhdGVEZWNrLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvSW5zcGlyZUVkaXRvci9Ub29sYmFyL1Rvb2xiYXIuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9OYXZiYXIvTmF2YmFyLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTmF2YmFyL2xvZ28tc21hbGwucG5nIiwid2VicGFjazovLy9leHRlcm5hbCBcImV2ZW50ZW1pdHRlcjNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmx1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZyb250LW1hdHRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiamFkZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhc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QUFTO0FBQ2hCLG1CQUFXLEVBQUUsd0NBQXdDO0FBQ3JELGdCQUFRLEVBQUUsSUFBSTs7T0FFZjtLQUNGOztHQUVGLEM7Ozs7OztBQ25CRCwyQzs7Ozs7O0FDQUEsMkM7Ozs7OztBQ0FBLDJDOzs7Ozs7QUNBQSwyQzs7Ozs7O0FDQUEsMkM7Ozs7OztBQ0FBLDJDOzs7Ozs7QUNBQSwyQzs7Ozs7O0FDQUEsMkM7Ozs7OztBQ0FBLDJDOzs7Ozs7QUNBQSxpRjs7Ozs7O0FDQUEsNEM7Ozs7OztBQ0FBLHNDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsMkM7Ozs7OztBQ0FBLGlDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEscUM7Ozs7OztBQ0FBLG1DOzs7Ozs7QUNBQSx5QyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDMzMWFlZTc3ZjE2NTZmM2MwM2I4XG4gKiovIiwiLypcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuL2NvcmUvRGlzcGF0Y2hlcic7XG5pbXBvcnQgQWN0aW9uVHlwZXMgZnJvbSAnLi9jb25zdGFudHMvQWN0aW9uVHlwZXMnO1xuaW1wb3J0IEFwcFN0b3JlIGZyb20gJy4vc3RvcmVzL0FwcFN0b3JlJztcblxudmFyIHNlcnZlciA9IGV4cHJlc3MoKTtcblxuc2VydmVyLnNldCgncG9ydCcsIChwcm9jZXNzLmVudi5QT1JUIHx8IDUwMDApKTtcbnNlcnZlci51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSkpKTtcblxuLy9cbi8vIFBhZ2UgQVBJXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuc2VydmVyLmdldCgnL2FwaS9wYWdlLyonLCBmdW5jdGlvbihyZXEsIHJlcykge1xuICB2YXIgdXJsUGF0aCA9IHJlcS5wYXRoLnN1YnN0cig5KTtcbiAgdmFyIHBhZ2UgPSBBcHBTdG9yZS5nZXRQYWdlKHVybFBhdGgpO1xuICByZXMuc2VuZChwYWdlKTtcbn0pO1xuXG4vL1xuLy8gU2VydmVyLXNpZGUgcmVuZGVyaW5nXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBUaGUgdG9wLWxldmVsIFJlYWN0IGNvbXBvbmVudCArIEhUTUwgdGVtcGxhdGUgZm9yIGl0XG52YXIgQXBwID0gUmVhY3QuY3JlYXRlRmFjdG9yeShyZXF1aXJlKCcuL2NvbXBvbmVudHMvQXBwJykpO1xudmFyIHRlbXBsYXRlRmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICd0ZW1wbGF0ZXMvaW5kZXguaHRtbCcpO1xudmFyIHRlbXBsYXRlID0gXy50ZW1wbGF0ZShmcy5yZWFkRmlsZVN5bmModGVtcGxhdGVGaWxlLCAndXRmOCcpKTtcblxuc2VydmVyLmdldCgnKicsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gIHZhciBkYXRhID0ge2Rlc2NyaXB0aW9uOiAnJ307XG4gIHZhciBhcHAgPSBuZXcgQXBwKHtcbiAgICBwYXRoOiByZXEucGF0aCxcbiAgICBvblNldFRpdGxlOiBmdW5jdGlvbih0aXRsZSkgeyBkYXRhLnRpdGxlID0gdGl0bGU7IH0sXG4gICAgb25TZXRNZXRhOiBmdW5jdGlvbihuYW1lLCBjb250ZW50KSB7IGRhdGFbbmFtZV0gPSBjb250ZW50OyB9LFxuICAgIG9uUGFnZU5vdEZvdW5kOiBmdW5jdGlvbigpIHsgcmVzLnN0YXR1cyg0MDQpOyB9XG4gIH0pO1xuICBkYXRhLmJvZHkgPSBSZWFjdC5yZW5kZXJUb1N0cmluZyhhcHApO1xuICB2YXIgaHRtbCA9IHRlbXBsYXRlKGRhdGEpO1xuICByZXMuc2VuZChodG1sKTtcbn0pO1xuXG4vLyBMb2FkIHBhZ2VzIGZyb20gdGhlIGAvc3JjL2NvbnRlbnQvYCBmb2xkZXIgaW50byB0aGUgQXBwU3RvcmVcbihmdW5jdGlvbigpIHtcbiAgdmFyIGFzc2lnbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9PYmplY3QuYXNzaWduJyk7XG4gIHZhciBmbSA9IHJlcXVpcmUoJ2Zyb250LW1hdHRlcicpO1xuICB2YXIgamFkZSA9IHJlcXVpcmUoJ2phZGUnKTtcbiAgdmFyIHNvdXJjZURpciA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL2NvbnRlbnQnKTtcbiAgdmFyIGdldEZpbGVzID0gZnVuY3Rpb24oZGlyKSB7XG4gICAgdmFyIHBhZ2VzID0gW107XG4gICAgZnMucmVhZGRpclN5bmMoZGlyKS5mb3JFYWNoKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIHZhciBzdGF0ID0gZnMuc3RhdFN5bmMocGF0aC5qb2luKGRpciwgZmlsZSkpO1xuICAgICAgaWYgKHN0YXQgJiYgc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIHBhZ2VzID0gcGFnZXMuY29uY2F0KGdldEZpbGVzKGZpbGUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENvbnZlcnQgdGhlIGZpbGUgdG8gYSBQYWdlIG9iamVjdFxuICAgICAgICB2YXIgZmlsZW5hbWUgPSBwYXRoLmpvaW4oZGlyLCBmaWxlKTtcbiAgICAgICAgdmFyIHVybCA9IGZpbGVuYW1lLlxuICAgICAgICAgIHN1YnN0cihzb3VyY2VEaXIubGVuZ3RoLCBmaWxlbmFtZS5sZW5ndGggLSBzb3VyY2VEaXIubGVuZ3RoIC0gNSlcbiAgICAgICAgICAucmVwbGFjZSgnXFxcXCcsICcvJyk7XG4gICAgICAgIGlmICh1cmwuaW5kZXhPZignL2luZGV4JywgdXJsLmxlbmd0aCAtIDYpICE9PSAtMSkge1xuICAgICAgICAgIHVybCA9IHVybC5zdWJzdHIoMCwgdXJsLmxlbmd0aCAtICh1cmwubGVuZ3RoID4gNiA/IDYgOiA1KSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNvdXJjZSA9IGZzLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKTtcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBmbShzb3VyY2UpO1xuICAgICAgICB2YXIgaHRtbCA9IGphZGUucmVuZGVyKGNvbnRlbnQuYm9keSwgbnVsbCwgJyAgJyk7XG4gICAgICAgIHZhciBwYWdlID0gYXNzaWduKHt9LCB7cGF0aDogdXJsLCBib2R5OiBodG1sfSwgY29udGVudC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgRGlzcGF0Y2hlci5oYW5kbGVTZXJ2ZXJBY3Rpb24oe1xuICAgICAgICAgIGFjdGlvblR5cGU6IEFjdGlvblR5cGVzLkxPQURfUEFHRSxcbiAgICAgICAgICBwYXRoOiB1cmwsXG4gICAgICAgICAgcGFnZTogcGFnZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFnZXM7XG4gIH07XG4gIHJldHVybiBnZXRGaWxlcyhzb3VyY2VEaXIpO1xufSkoKTtcblxuc2VydmVyLmxpc3RlbihzZXJ2ZXIuZ2V0KCdwb3J0JyksIGZ1bmN0aW9uKCkge1xuICBpZiAocHJvY2Vzcy5zZW5kKSB7XG4gICAgcHJvY2Vzcy5zZW5kKCdvbmxpbmUnKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnVGhlIHNlcnZlciBpcyBydW5uaW5nIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JyArIHNlcnZlci5nZXQoJ3BvcnQnKSk7XG4gIH1cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL34vZXNsaW50LWxvYWRlciFEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvc3JjL3NlcnZlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJyZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4qXG4qIEBwcm9qZWN0IEluc3BpcmVcbiogQGRhdGUgMy4yMDE1XG4qIEBhdXRob3IgIERhbmllbGEgVmFsZXJvLCBTYXBpZW50IEdtYkhcbiogQGxpY2Vuc29yICBQdWJsaWNpcyBTYXBpZW50XG4qIEBzaXRlIEluc3BpcmVcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9Gb290ZXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9vdGVyIGNsYXNzTmFtZT1cIkZvb3RlclwiPlxuICAgICAgICA8bmF2IGNsYXNzTmFtZT1cIk5hdmJhciBOYXZiYXJGb290ZXIgdS1wYWRkaW5nLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgPGxpPjxhIGNsYXNzTmFtZT1cInUtbmVnYXRpdmUtbGlua1wiIGhyZWY9XCIvXCI+SG9tZTwvYT48L2xpPlxuICAgICAgICAgICAgICA8bGk+PGEgY2xhc3NOYW1lPVwidS1uZWdhdGl2ZS1saW5rXCIgaHJlZj1cIi9pbnNwaXJlRWRpdG9yXCI+SW5zcGlyZSBFZGl0b3I8L2E+PC9saT5cbiAgICAgICAgICAgICAgPGxpPjxhIGNsYXNzTmFtZT1cInUtbmVnYXRpdmUtbGlua1wiIGhyZWY9XCIvcHJpdmFjeVwiPlByaXZhY3k8L2E+PC9saT5cbiAgICAgICAgICAgICAgPGxpPjxhIGNsYXNzTmFtZT1cInUtbmVnYXRpdmUtbGlua1wiIGhyZWY9XCIvYWJvdXRcIj5BYm91dDwvYT48L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiRm9vdGVyLUNvcHlyaWdodFwiPlxuICAgICAgICAgICAgICA8c3Bhbj7CqSBTYXBpZW50IE5pdHJvPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmF2PlxuICAgICAgICA8L2Zvb3Rlcj5cbiAgICApO1xuICB9XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL34vZXNsaW50LWxvYWRlciFEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvc3JjL2NvbXBvbmVudHMvRm9vdGVyL0Zvb3Rlci5qc1xuICoqLyIsIi8qXHJcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XHJcbiAqIENvcHlyaWdodCAoYykgMjAxNCBLb25zdGFudGluIFRhcmt1cyAoQGtvaXN0eWEpLCBLcmlhU29mdCBMTEMuXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxyXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxyXG4gKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBrZXlNaXJyb3IgZnJvbSAncmVhY3QvbGliL2tleU1pcnJvcic7XHJcblxyXG52YXIgQWN0aW9uVHlwZXMgPSBrZXlNaXJyb3Ioe1xyXG5cclxuICBMT0FEX1BBR0U6IG51bGwsXHJcbiAgTE9BRF9QQUdFX1NVQ0NFU1M6IG51bGwsXHJcbiAgTE9BRF9QQUdFX0VSUk9SOiBudWxsLFxyXG4gIENIQU5HRV9MT0NBVElPTjogbnVsbFxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFjdGlvblR5cGVzO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvfi9lc2xpbnQtbG9hZGVyIUQ6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvY29uc3RhbnRzL0FjdGlvblR5cGVzLmpzXG4gKiovIiwiLypcclxuICogUmVhY3QuanMgU3RhcnRlciBLaXRcclxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbiAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IEZsdXggZnJvbSAnZmx1eCc7XHJcbmltcG9ydCBQYXlsb2FkU291cmNlcyBmcm9tICcuLi9jb25zdGFudHMvUGF5bG9hZFNvdXJjZXMnO1xyXG5pbXBvcnQgYXNzaWduIGZyb20gJ3JlYWN0L2xpYi9PYmplY3QuYXNzaWduJztcclxuXHJcbi8qKlxyXG4gKiBBIHNpbmdsZXRvbiB0aGF0IG9wZXJhdGVzIGFzIHRoZSBjZW50cmFsIGh1YiBmb3IgYXBwbGljYXRpb24gdXBkYXRlcy5cclxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gdmlzaXQgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vZmx1eC9cclxuICovXHJcbnZhciBEaXNwYXRjaGVyID0gYXNzaWduKG5ldyBGbHV4LkRpc3BhdGNoZXIoKSwge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge29iamVjdH0gYWN0aW9uIFRoZSBkZXRhaWxzIG9mIHRoZSBhY3Rpb24sIGluY2x1ZGluZyB0aGUgYWN0aW9uJ3NcclxuICAgKiB0eXBlIGFuZCBhZGRpdGlvbmFsIGRhdGEgY29taW5nIGZyb20gdGhlIHNlcnZlci5cclxuICAgKi9cclxuICBoYW5kbGVTZXJ2ZXJBY3Rpb24oYWN0aW9uKSB7XHJcbiAgICB2YXIgcGF5bG9hZCA9IHtcclxuICAgICAgc291cmNlOiBQYXlsb2FkU291cmNlcy5TRVJWRVJfQUNUSU9OLFxyXG4gICAgICBhY3Rpb246IGFjdGlvblxyXG4gICAgfTtcclxuICAgIHRoaXMuZGlzcGF0Y2gocGF5bG9hZCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbiBUaGUgZGV0YWlscyBvZiB0aGUgYWN0aW9uLCBpbmNsdWRpbmcgdGhlIGFjdGlvbidzXHJcbiAgICogdHlwZSBhbmQgYWRkaXRpb25hbCBkYXRhIGNvbWluZyBmcm9tIHRoZSB2aWV3LlxyXG4gICAqL1xyXG4gIGhhbmRsZVZpZXdBY3Rpb24oYWN0aW9uKSB7XHJcbiAgICB2YXIgcGF5bG9hZCA9IHtcclxuICAgICAgc291cmNlOiBQYXlsb2FkU291cmNlcy5WSUVXX0FDVElPTixcclxuICAgICAgYWN0aW9uOiBhY3Rpb25cclxuICAgIH07XHJcbiAgICB0aGlzLmRpc3BhdGNoKHBheWxvYWQpO1xyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaGVyO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvfi9lc2xpbnQtbG9hZGVyIUQ6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvY29yZS9EaXNwYXRjaGVyLmpzXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBPYmplY3QuYXNzaWduXG4gKi9cblxuLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5hc3NpZ25cblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlcykge1xuICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIHRhcmdldCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgfVxuXG4gIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIGZvciAodmFyIG5leHRJbmRleCA9IDE7IG5leHRJbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IG5leHRJbmRleCsrKSB7XG4gICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbbmV4dEluZGV4XTtcbiAgICBpZiAobmV4dFNvdXJjZSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgZnJvbSA9IE9iamVjdChuZXh0U291cmNlKTtcblxuICAgIC8vIFdlIGRvbid0IGN1cnJlbnRseSBzdXBwb3J0IGFjY2Vzc29ycyBub3IgcHJveGllcy4gVGhlcmVmb3JlIHRoaXNcbiAgICAvLyBjb3B5IGNhbm5vdCB0aHJvdy4gSWYgd2UgZXZlciBzdXBwb3J0ZWQgdGhpcyB0aGVuIHdlIG11c3QgaGFuZGxlXG4gICAgLy8gZXhjZXB0aW9ucyBhbmQgc2lkZS1lZmZlY3RzLiBXZSBkb24ndCBzdXBwb3J0IHN5bWJvbHMgc28gdGhleSB3b24ndFxuICAgIC8vIGJlIHRyYW5zZmVycmVkLlxuXG4gICAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG87XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4qXG4qIEBwcm9qZWN0IEluc3BpcmVcbiogQGRhdGUgMy4yMDE1XG4qIEBhdXRob3IgIERhbmllbGEgVmFsZXJvLCBTYXBpZW50IEdtYkhcbiogQGxpY2Vuc29yICBQdWJsaWNpcyBTYXBpZW50XG4qIEBzaXRlIEluc3BpcmVcbipcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgS29uc3RhbnRpbiBUYXJrdXMgKEBrb2lzdHlhKSwgS3JpYVNvZnQgTExDLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgXCIuL0NvbnRlbnRBcmVhLnNjc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHByb3BUeXBlczoge1xuICAgIGJvZHk6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgeyBjbGFzc05hbWUsIGJvZHksIG90aGVyIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXsnQ29udGVudEFyZWEnICsgY2xhc3NOYW1lfVxuICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWw6IGJvZHl9fSB7Li4ub3RoZXJ9IC8+O1xuICB9XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL34vZXNsaW50LWxvYWRlciFEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvc3JjL2NvbXBvbmVudHMvQ29udGVudEFyZWEvQ29udGVudEFyZWEuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTmF2YmFyIGZyb20gJy4uL05hdmJhcic7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgIDxOYXZiYXIvPlxuICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvfi9lc2xpbnQtbG9hZGVyIUQ6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLmpzXG4gKiovIiwiLypcclxuICogUmVhY3QuanMgU3RhcnRlciBLaXRcclxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbiAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IGtleU1pcnJvciBmcm9tICdyZWFjdC9saWIva2V5TWlycm9yJztcclxuXHJcbnZhciBQYXlsb2FkU291cmNlcyA9IGtleU1pcnJvcih7XHJcblxyXG4gIFZJRVdfQUNUSU9OOiBudWxsLFxyXG4gIFNFUlZFUl9BQ1RJT046IG51bGxcclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYXlsb2FkU291cmNlcztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL34vZXNsaW50LWxvYWRlciFEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvc3JjL2NvbnN0YW50cy9QYXlsb2FkU291cmNlcy5qc1xuICoqLyIsIi8qXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuLi9jb3JlL0Rpc3BhdGNoZXInO1xuaW1wb3J0IEFjdGlvblR5cGVzIGZyb20gJy4uL2NvbnN0YW50cy9BY3Rpb25UeXBlcyc7XG5pbXBvcnQgUGF5bG9hZFNvdXJjZXMgZnJvbSAnLi4vY29uc3RhbnRzL1BheWxvYWRTb3VyY2VzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRlbWl0dGVyMyc7XG5pbXBvcnQgYXNzaWduIGZyb20gJ3JlYWN0L2xpYi9PYmplY3QuYXNzaWduJztcblxudmFyIENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xuXG52YXIgcGFnZXMgPSB7fTtcbnZhciBsb2FkaW5nID0gZmFsc2U7XG5cbmlmIChfX1NFUlZFUl9fKSB7XG4gIHBhZ2VzWycvJ10gPSB7dGl0bGU6ICdIb21lIFBhZ2UnfTtcbiAgcGFnZXNbJy9pbnNwaXJlRWRpdG9yJ10gPSB7dGl0bGU6ICdJbnNwaXJlIGVkaXRvcicsIHR5cGU6ICdlZGl0b3InfTtcbn1cblxudmFyIEFwcFN0b3JlID0gYXNzaWduKHt9LCBFdmVudEVtaXR0ZXIucHJvdG90eXBlLCB7XG5cbiAgaXNMb2FkaW5nKCkge1xuICAgIHJldHVybiBsb2FkaW5nO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXRzIHBhZ2UgZGF0YSBieSB0aGUgZ2l2ZW4gVVJMIHBhdGguXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIFVSTCBwYXRoLlxuICAgKiBAcmV0dXJucyB7Kn0gUGFnZSBkYXRhLlxuICAgKi9cbiAgZ2V0UGFnZShwYXRoKSB7XG4gICAgcmV0dXJuIHBhdGggaW4gcGFnZXMgPyBwYWdlc1twYXRoXSA6IHtcbiAgICAgIHRpdGxlOiAnUGFnZSBOb3QgRm91bmQnLFxuICAgICAgdHlwZTogJ25vdGZvdW5kJ1xuICAgIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVtaXRzIGNoYW5nZSBldmVudCB0byBhbGwgcmVnaXN0ZXJlZCBldmVudCBsaXN0ZW5lcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBJbmRpY2F0aW9uIGlmIHdlJ3ZlIGVtaXR0ZWQgYW4gZXZlbnQuXG4gICAqL1xuICBlbWl0Q2hhbmdlKCkge1xuICAgIHJldHVybiB0aGlzLmVtaXQoQ0hBTkdFX0VWRU5UKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBuZXcgY2hhbmdlIGV2ZW50IGxpc3RlbmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayBmdW5jdGlvbi5cbiAgICovXG4gIG9uQ2hhbmdlKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihDSEFOR0VfRVZFTlQsIGNhbGxiYWNrKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlIGNoYW5nZSBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqL1xuICBvZmYoY2FsbGJhY2spIHtcbiAgICB0aGlzLm9mZihDSEFOR0VfRVZFTlQsIGNhbGxiYWNrKTtcbiAgfVxuXG59KTtcblxuQXBwU3RvcmUuZGlzcGF0Y2hlclRva2VuID0gRGlzcGF0Y2hlci5yZWdpc3RlcigocGF5bG9hZCkgPT4ge1xuICB2YXIgYWN0aW9uID0gcGF5bG9hZC5hY3Rpb247XG5cbiAgc3dpdGNoIChhY3Rpb24uYWN0aW9uVHlwZSkge1xuXG4gICAgY2FzZSBBY3Rpb25UeXBlcy5MT0FEX1BBR0U6XG4gICAgICBpZiAoYWN0aW9uLnNvdXJjZSA9PT0gUGF5bG9hZFNvdXJjZXMuVklFV19BQ1RJT04pIHtcbiAgICAgICAgbG9hZGluZyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIGlmICghYWN0aW9uLmVycikge1xuICAgICAgICAgIHBhZ2VzW2FjdGlvbi5wYXRoXSA9IGFjdGlvbi5wYWdlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBBcHBTdG9yZS5lbWl0Q2hhbmdlKCk7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBEbyBub3RoaW5nXG5cbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBTdG9yZTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9+L2VzbGludC1sb2FkZXIhRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL3NyYy9zdG9yZXMvQXBwU3RvcmUuanNcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgRXhlY3V0aW9uRW52aXJvbm1lbnRcbiAqL1xuXG4vKmpzbGludCBldmlsOiB0cnVlICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY2FuVXNlRE9NID0gISEoXG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIHdpbmRvdy5kb2N1bWVudCAmJlxuICB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxuKTtcblxuLyoqXG4gKiBTaW1wbGUsIGxpZ2h0d2VpZ2h0IG1vZHVsZSBhc3Npc3Rpbmcgd2l0aCB0aGUgZGV0ZWN0aW9uIGFuZCBjb250ZXh0IG9mXG4gKiBXb3JrZXIuIEhlbHBzIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY2llcyBhbmQgYWxsb3dzIGNvZGUgdG8gcmVhc29uIGFib3V0XG4gKiB3aGV0aGVyIG9yIG5vdCB0aGV5IGFyZSBpbiBhIFdvcmtlciwgZXZlbiBpZiB0aGV5IG5ldmVyIGluY2x1ZGUgdGhlIG1haW5cbiAqIGBSZWFjdFdvcmtlcmAgZGVwZW5kZW5jeS5cbiAqL1xudmFyIEV4ZWN1dGlvbkVudmlyb25tZW50ID0ge1xuXG4gIGNhblVzZURPTTogY2FuVXNlRE9NLFxuXG4gIGNhblVzZVdvcmtlcnM6IHR5cGVvZiBXb3JrZXIgIT09ICd1bmRlZmluZWQnLFxuXG4gIGNhblVzZUV2ZW50TGlzdGVuZXJzOlxuICAgIGNhblVzZURPTSAmJiAhISh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciB8fCB3aW5kb3cuYXR0YWNoRXZlbnQpLFxuXG4gIGNhblVzZVZpZXdwb3J0OiBjYW5Vc2VET00gJiYgISF3aW5kb3cuc2NyZWVuLFxuXG4gIGlzSW5Xb3JrZXI6ICFjYW5Vc2VET00gLy8gRm9yIG5vdywgdGhpcyBpcyB0cnVlIC0gbWlnaHQgY2hhbmdlIGluIHRoZSBmdXR1cmUuXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXhlY3V0aW9uRW52aXJvbm1lbnQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGludmFyaWFudFxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdJbnZhcmlhbnQgVmlvbGF0aW9uOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9pbnZhcmlhbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGtleU1pcnJvclxuICogQHR5cGVjaGVja3Mgc3RhdGljLW9ubHlcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCIuL2ludmFyaWFudFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGFuIGVudW1lcmF0aW9uIHdpdGgga2V5cyBlcXVhbCB0byB0aGVpciB2YWx1ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgIHZhciBDT0xPUlMgPSBrZXlNaXJyb3Ioe2JsdWU6IG51bGwsIHJlZDogbnVsbH0pO1xuICogICB2YXIgbXlDb2xvciA9IENPTE9SUy5ibHVlO1xuICogICB2YXIgaXNDb2xvclZhbGlkID0gISFDT0xPUlNbbXlDb2xvcl07XG4gKlxuICogVGhlIGxhc3QgbGluZSBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIGlmIHRoZSB2YWx1ZXMgb2YgdGhlIGdlbmVyYXRlZCBlbnVtIHdlcmVcbiAqIG5vdCBlcXVhbCB0byB0aGVpciBrZXlzLlxuICpcbiAqICAgSW5wdXQ6ICB7a2V5MTogdmFsMSwga2V5MjogdmFsMn1cbiAqICAgT3V0cHV0OiB7a2V5MToga2V5MSwga2V5Mjoga2V5Mn1cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbnZhciBrZXlNaXJyb3IgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICB2YXIga2V5O1xuICAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WID8gaW52YXJpYW50KFxuICAgIG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopLFxuICAgICdrZXlNaXJyb3IoLi4uKTogQXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QuJ1xuICApIDogaW52YXJpYW50KG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopKSk7XG4gIGZvciAoa2V5IGluIG9iaikge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXRba2V5XSA9IGtleTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlNaXJyb3I7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIva2V5TWlycm9yLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcbiAqIFJlYWN0LmpzIFN0YXJ0ZXIgS2l0XHJcbiAqIENvcHlyaWdodCAoYykgMjAxNCBLb25zdGFudGluIFRhcmt1cyAoQGtvaXN0eWEpLCBLcmlhU29mdCBMTEMuXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxyXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxyXG4gKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJy4uL2NvcmUvRGlzcGF0Y2hlcic7XHJcbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICcuLi9jb25zdGFudHMvQWN0aW9uVHlwZXMnO1xyXG5pbXBvcnQgRXhlY3V0aW9uRW52aXJvbm1lbnQgZnJvbSAncmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50JztcclxuaW1wb3J0IGh0dHAgZnJvbSAnc3VwZXJhZ2VudCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgbmF2aWdhdGVUbyhwYXRoKSB7XHJcbiAgICBpZiAoRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NKSB7XHJcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgIGFjdGlvblR5cGU6IEFjdGlvblR5cGVzLkNIQU5HRV9MT0NBVElPTiwgcGF0aDogcGF0aFxyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgbG9hZFBhZ2UocGF0aCwgY2IpIHtcclxuICAgIERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XHJcbiAgICAgIGFjdGlvblR5cGU6IEFjdGlvblR5cGVzLkxPQURfUEFHRSwgcGF0aDogcGF0aFxyXG4gICAgfSk7XHJcblxyXG4gICAgaHR0cC5nZXQoJy9hcGkvcGFnZScgKyBwYXRoKVxyXG4gICAgICAuYWNjZXB0KCdhcHBsaWNhdGlvbi9qc29uJylcclxuICAgICAgLmVuZCgoZXJyLCByZXMpID0+IHtcclxuICAgICAgICBEaXNwYXRjaGVyLmhhbmRsZVNlcnZlckFjdGlvbih7XHJcbiAgICAgICAgICBhY3Rpb25UeXBlOiBBY3Rpb25UeXBlcy5MT0FEX1BBR0UsIHBhdGg6IHBhdGgsIGVycjogZXJyLCBwYWdlOiByZXMuYm9keVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgY2IoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9+L2VzbGludC1sb2FkZXIhRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL3NyYy9hY3Rpb25zL0FwcEFjdGlvbnMuanNcbiAqKi8iLCIvKipcbipcbiogQHByb2plY3QgSW5zcGlyZVxuKiBAZGF0ZSAzLjIwMTVcbiogQGF1dGhvciAgRGFuaWVsYSBWYWxlcm8sIFNhcGllbnQgR21iSFxuKiBAbGljZW5zb3IgIFB1YmxpY2lzIFNhcGllbnRcbiogQHNpdGUgSW5zcGlyZVxuKlxuICogUmVhY3QuanMgU3RhcnRlciBLaXRcbiAqIENvcHlyaWdodCAoYykgMjAxNCBLb25zdGFudGluIFRhcmt1cyAoQGtvaXN0eWEpLCBLcmlhU29mdCBMTEMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICcuL0FwcC5zY3NzJztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzZXR0aW5ncyBmcm9tICcuLi8uLi9jb25zdGFudHMvU2V0dGluZ3MnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdyZWFjdC9saWIvaW52YXJpYW50JztcbmltcG9ydCBOYXZpZ2F0aW9uTWl4aW4gZnJvbSAnLi9OYXZpZ2F0aW9uTWl4aW4nO1xuaW1wb3J0IEFwcFN0b3JlIGZyb20gJy4uLy4uL3N0b3Jlcy9BcHBTdG9yZSc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJy4uL0hlYWRlcic7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL0Zvb3Rlcic7XG5pbXBvcnQgQ29udGVudEFyZWEgZnJvbSAnLi4vQ29udGVudEFyZWEnO1xuaW1wb3J0IE5vdEZvdW5kUGFnZSBmcm9tICcuLi9Ob3RGb3VuZFBhZ2UnO1xuaW1wb3J0IEluc3BpcmVFZGl0b3IgZnJvbSAnLi4vSW5zcGlyZUVkaXRvcic7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgbWl4aW5zOiBbTmF2aWdhdGlvbk1peGluXSxcblxuICBwcm9wVHlwZXM6IHtcbiAgICBwYXRoOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgb25TZXRUaXRsZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblNldE1ldGE6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25QYWdlTm90Rm91bmQ6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgdmFyIHBhZ2UgPSBBcHBTdG9yZS5nZXRQYWdlKHRoaXMucHJvcHMucGF0aCk7XG4gICAgaW52YXJpYW50KHBhZ2UgIT09IHVuZGVmaW5lZCwgJ0ZhaWxlZCB0byBsb2FkIHBhZ2UgY29udGVudC4nKTtcbiAgICB0aGlzLnByb3BzLm9uU2V0VGl0bGUocGFnZS50aXRsZSk7XG4gICAgaWYgKHBhZ2UudHlwZSA9PT0gJ25vdGZvdW5kJykge1xuICAgICAgdGhpcy5wcm9wcy5vblBhZ2VOb3RGb3VuZCgpO1xuICAgICAvLyByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChOb3RGb3VuZFBhZ2UsIHBhZ2UpO1xuICAgIH1cblxuICAgIGlmIChwYWdlLnR5cGUgPT09ICdlZGl0b3InKSB7XG4gICAgICB0aGlzLnByb3BzLm9uUGFnZU5vdEZvdW5kKCk7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChJbnNwaXJlRWRpdG9yLCBwYWdlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJBcHBcIj5cbiAgICAgICA8SGVhZGVyLz5cbiAgICAgICB7XG4gICAgICAgICAocGFnZS50eXBlID09PSBcImVkaXRvclwiKSA/XG4gICAgICAgICA8SW5zcGlyZUVkaXRvci8+XG4gICAgICAgICA6XG4gICAgICAgICA8Q29udGVudEFyZWEgY2xhc3NOYW1lPVwiXCIgey4uLnBhZ2V9Lz5cbiAgICAgICAgfVxuICAgICAgICA8Rm9vdGVyLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL34vZXNsaW50LWxvYWRlciFEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qc1xuICoqLyIsIi8qKlxuKlxuKiBAcHJvamVjdCBJbnNwaXJlXG4qIEBkYXRlIDMuMjAxNVxuKiBAYXV0aG9yICBEYW5pZWxhIFZhbGVybywgU2FwaWVudCBHbWJIXG4qIEBsaWNlbnNvciAgUHVibGljaXMgU2FwaWVudFxuKiBAc2l0ZSBJbnNwaXJlXG4qXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgRXhlY3V0aW9uRW52aXJvbm1lbnQgZnJvbSAncmVhY3QvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50JztcbmltcG9ydCBBcHBBY3Rpb25zIGZyb20gJy4uLy4uL2FjdGlvbnMvQXBwQWN0aW9ucyc7XG5cbnZhciBOYXZpZ2F0aW9uTWl4aW4gPSB7XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKEV4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5oYW5kbGVQb3BTdGF0ZSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrKTtcbiAgICB9XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5oYW5kbGVQb3BTdGF0ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayk7XG4gIH0sXG5cbiAgaGFuZGxlUG9wU3RhdGUoZXZlbnQpIHtcbiAgICAvL2lmIChldmVudC5zdGF0ZSkge1xuICAgIC8vICBUT0RPOiBSZXBsYWNlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAvLyAgdmFyIHBhdGggPSBldmVudC5zdGF0ZS5wYXRoO1xuICAgIC8vICByZXBsYWNlKHBhdGgsIGV2ZW50LnN0YXRlKTtcbiAgICAvL31cbiAgICBpZiAoIWV2ZW50LnN0YXRlKSB7XG4gICAgICBBcHBBY3Rpb25zLm5hdmlnYXRlVG8od2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAxIHx8IGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSB8fCBldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlIGxpbmtcbiAgICB2YXIgZWwgPSBldmVudC50YXJnZXQ7XG4gICAgd2hpbGUgKGVsICYmIGVsLm5vZGVOYW1lICE9PSAnQScpIHtcbiAgICAgIGVsID0gZWwucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgaWYgKCFlbCB8fCBlbC5ub2RlTmFtZSAhPT0gJ0EnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWdub3JlIGlmIHRhZyBoYXNcbiAgICAvLyAxLiBcImRvd25sb2FkXCIgYXR0cmlidXRlXG4gICAgLy8gMi4gcmVsPVwiZXh0ZXJuYWxcIiBhdHRyaWJ1dGVcbiAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdkb3dubG9hZCcpIHx8IGVsLmdldEF0dHJpYnV0ZSgncmVsJykgPT09ICdleHRlcm5hbCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgbm9uLWhhc2ggZm9yIHRoZSBzYW1lIHBhdGhcbiAgICB2YXIgbGluayA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIGlmIChlbC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWUgJiYgKGVsLmhhc2ggfHwgbGluayA9PT0gJyMnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBtYWlsdG86IGluIHRoZSBocmVmXG4gICAgaWYgKGxpbmsgJiYgbGluay5pbmRleE9mKCdtYWlsdG86JykgPiAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIHRhcmdldFxuICAgIGlmIChlbC50YXJnZXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBYLW9yaWdpblxuICAgIHZhciBvcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICtcbiAgICAgICh3aW5kb3cubG9jYXRpb24ucG9ydCA/ICc6JyArIHdpbmRvdy5sb2NhdGlvbi5wb3J0IDogJycpO1xuICAgIGlmICghKGVsLmhyZWYgJiYgZWwuaHJlZi5pbmRleE9mKG9yaWdpbikgPT09IDApKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUmVidWlsZCBwYXRoXG4gICAgdmFyIHBhdGggPSBlbC5wYXRobmFtZSArIGVsLnNlYXJjaCArIChlbC5oYXNoIHx8ICcnKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgQXBwQWN0aW9ucy5sb2FkUGFnZShwYXRoLCAoKSA9PiB7XG4gICAgICBBcHBBY3Rpb25zLm5hdmlnYXRlVG8ocGF0aCk7XG4gICAgfSk7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBOYXZpZ2F0aW9uTWl4aW47XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvfi9lc2xpbnQtbG9hZGVyIUQ6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvY29tcG9uZW50cy9BcHAvTmF2aWdhdGlvbk1peGluLmpzXG4gKiovIiwiLyoqXG4qXG4qIEBwcm9qZWN0IEluc3BpcmVcbiogQGRhdGUgMy4yMDE1XG4qIEBhdXRob3IgIERhbmllbGEgVmFsZXJvLCBTYXBpZW50IEdtYkhcbiogQGxpY2Vuc29yICBQdWJsaWNpcyBTYXBpZW50XG4qIEBzaXRlIEluc3BpcmVcbiovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICcuL0luc3BpcmVFZGl0b3Iuc2Nzcyc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vRm9vdGVyJztcblxuaW1wb3J0IEl0ZW1FZGl0b3IgZnJvbSAnLi9JdGVtRWRpdG9yJztcbmltcG9ydCBTbGlkZXNWaWV3IGZyb20gJy4vU2xpZGVzVmlldyc7XG5pbXBvcnQgVGVtcGxhdGVEZWNrIGZyb20gJy4vVGVtcGxhdGVEZWNrJztcbmltcG9ydCBUb29sYmFyIGZyb20gJy4vVG9vbGJhcic7XG5pbXBvcnQgU2xpZGVFZGl0b3IgZnJvbSAnLi9TbGlkZUVkaXRvcic7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWUgPSBcIkluc3BpcmVFZGl0b3JcIj5cbiAgICAgICAgICAgICAgPFRvb2xiYXIvPlxuICAgICAgICAgICAgICA8U2xpZGVFZGl0b3IgY2xhc3NOYW1lPVwiQ2VudGVyQXJlYVwiLz5cbiAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiTGVmdFRvb2xiYXJcIj5cbiAgICAgICAgICAgICAgICA8U2xpZGVzVmlldy8+XG4gICAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiUmlnaHRUb29sYmFyXCI+XG4gICAgICAgICAgICAgICAgPEl0ZW1FZGl0b3IgY2xhc3NOYW1lPVwiUmlnaHRUb29sYmFyLVRvcEVsZW1lbnRcIi8+XG4gICAgICAgICAgICAgICAgPFRlbXBsYXRlRGVjayBjbGFzc05hbWU9XCJSaWdodFRvb2xiYXItQm90dG9tRWxlbWVudFwiLz5cbiAgICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgICA8Rm9vdGVyLz5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9+L2VzbGludC1sb2FkZXIhRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL3NyYy9jb21wb25lbnRzL0luc3BpcmVFZGl0b3IvSW5zcGlyZUVkaXRvci5qc1xuICoqLyIsIi8qKlxuKlxuKiBAcHJvamVjdCBJbnNwaXJlXG4qIEBkYXRlIDMuMjAxNVxuKiBAYXV0aG9yICBEYW5pZWxhIFZhbGVybywgU2FwaWVudCBHbWJIXG4qIEBsaWNlbnNvciAgUHVibGljaXMgU2FwaWVudFxuKiBAc2l0ZSBJbnNwaXJlXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnLi9JdGVtRWRpdG9yLnNjc3MnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgcHJvcFR5cGVzOiB7XG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbiAgfSxcbiAgICByZW5kZXIoKSB7XG4gICAgICB2YXIgeyBjbGFzc05hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG4gICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWUgPXsnSXRlbUVkaXRvciAnICsgY2xhc3NOYW1lfT4gPC9zZWN0aW9uPlxuICAgICAgICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9+L2VzbGludC1sb2FkZXIhRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL3NyYy9jb21wb25lbnRzL0luc3BpcmVFZGl0b3IvSXRlbUVkaXRvci9JdGVtRWRpdG9yLmpzXG4gKiovIiwiLyoqXG4qXG4qIEBwcm9qZWN0IEluc3BpcmVcbiogQGRhdGUgMy4yMDE1XG4qIEBhdXRob3IgIERhbmllbGEgVmFsZXJvLCBTYXBpZW50IEdtYkhcbiogQGxpY2Vuc29yICBQdWJsaWNpcyBTYXBpZW50XG4qIEBzaXRlIEluc3BpcmVcbiovXG4ndXNlIHN0cmljdCc7XG5cbi8vaW1wb3J0ICcuL1NsaWRlRWRpdG9yLnNjc3MnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcHJvcFR5cGVzOiB7XG4gICAgY2xhc3NOYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHZhciB7IGNsYXNzTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9eydTbGlkZUVkaXRvciAnICsgY2xhc3NOYW1lfSAvPjtcbiAgfVxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvfi9lc2xpbnQtbG9hZGVyIUQ6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvY29tcG9uZW50cy9JbnNwaXJlRWRpdG9yL1NsaWRlRWRpdG9yL1NsaWRlRWRpdG9yLmpzXG4gKiovIiwiLyoqXG4qXG4qIEBwcm9qZWN0IEluc3BpcmVcbiogQGRhdGUgMy4yMDE1XG4qIEBhdXRob3IgIERhbmllbGEgVmFsZXJvLCBTYXBpZW50IEdtYkhcbiogQGxpY2Vuc29yICBQdWJsaWNpcyBTYXBpZW50XG4qIEBzaXRlIEluc3BpcmVcbiovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnLi9TbGlkZXNWaWV3LnNjc3MnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZSA9IFwiU2xpZGVzVmlld1wiPiA8L3NlY3Rpb24+XG4gICAgICAgICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL34vZXNsaW50LWxvYWRlciFEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvc3JjL2NvbXBvbmVudHMvSW5zcGlyZUVkaXRvci9TbGlkZXNWaWV3L1NsaWRlc1ZpZXcuanNcbiAqKi8iLCIvKipcbipcbiogQHByb2plY3QgSW5zcGlyZVxuKiBAZGF0ZSAzLjIwMTVcbiogQGF1dGhvciAgRGFuaWVsYSBWYWxlcm8sIFNhcGllbnQgR21iSFxuKiBAbGljZW5zb3IgIFB1YmxpY2lzIFNhcGllbnRcbiogQHNpdGUgSW5zcGlyZVxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJy4vVGVtcGxhdGVEZWNrLnNjc3MnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgIFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgIHByb3BUeXBlczoge1xuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG4gIH0sXG4gICAgcmVuZGVyKCkge1xuICAgICAgdmFyIHsgY2xhc3NOYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPXsnVGVtcGxhdGVEZWNrICcgKyBjbGFzc05hbWV9ID4gPC9zZWN0aW9uPlxuICAgICAgICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9+L2VzbGludC1sb2FkZXIhRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL3NyYy9jb21wb25lbnRzL0luc3BpcmVFZGl0b3IvVGVtcGxhdGVEZWNrL1RlbXBsYXRlRGVjay5qc1xuICoqLyIsIi8qKlxuKlxuKiBAcHJvamVjdCBJbnNwaXJlXG4qIEBkYXRlIDMuMjAxNVxuKiBAYXV0aG9yICBEYW5pZWxhIFZhbGVybywgU2FwaWVudCBHbWJIXG4qIEBsaWNlbnNvciAgUHVibGljaXMgU2FwaWVudFxuKiBAc2l0ZSBJbnNwaXJlXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnLi9Ub29sYmFyLnNjc3MnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuXG5leHBvcnQgZGVmYXVsdCAgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZSA9IFwiVG9vbGJhciBUb29sYmFyLXNoYWRvd1wiPjxoND5Ub29sYmFyPC9oND48L3NlY3Rpb24+XG4gICAgICAgICAgICAvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL34vZXNsaW50LWxvYWRlciFEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvc3JjL2NvbXBvbmVudHMvSW5zcGlyZUVkaXRvci9Ub29sYmFyL1Rvb2xiYXIuanNcbiAqKi8iLCIvKipcbipcbiogQHByb2plY3QgSW5zcGlyZVxuKiBAZGF0ZSAzLjIwMTVcbiogQGF1dGhvciAgRGFuaWVsYSBWYWxlcm8sIFNhcGllbnQgR21iSFxuKiBAbGljZW5zb3IgIFB1YmxpY2lzIFNhcGllbnRcbiogQHNpdGUgSW5zcGlyZVxuKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9OYXZiYXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPG5hdiBjbGFzc05hbWU9XCJOYXZiYXJcIiByb2xlPVwibmF2aWdhdGlvblwiPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIk5hdmJhci1CcmFuZCB1LW5lZ2F0aXZlLWxpbmtcIiBocmVmPVwiL1wiPlxuICAgICAgICAgICAgPGltZyBzcmM9e3JlcXVpcmUoJy4vbG9nby1zbWFsbC5wbmcnKX0gaGVpZ2h0PVwiNTBcIiBhbHQ9XCJTYXBpZW50XCIgLz5cbiAgICAgICAgICAgIDxoNSBjbGFzc05hbWU9XCJOYXZiYXItQnJhbmQtTmFtZVwiPkluc3BpcmU8L2g1PlxuICAgICAgICAgIDwvYT5cbiAgICAgIDwvbmF2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovd29ya3NwYWNlL2VkaXRvci9pbnNwaXJlL34vZXNsaW50LWxvYWRlciFEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvc3JjL2NvbXBvbmVudHMvTmF2YmFyL05hdmJhci5qc1xuICoqLyIsIi8qKlxuKlxuKiBAcHJvamVjdCBJbnNwaXJlXG4qIEBkYXRlIDMuMjAxNVxuKiBAYXV0aG9yICBEYW5pZWxhIFZhbGVybywgU2FwaWVudCBHbWJIXG4qIEBsaWNlbnNvciAgUHVibGljaXMgU2FwaWVudFxuKiBAc2l0ZSBJbnNwaXJlXG4gKiBSZWFjdC5qcyBTdGFydGVyIEtpdFxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuLi9IZWFkZXInO1xuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9Gb290ZXInO1xuaW1wb3J0IENvbnRlbnRBcmVhIGZyb20gJy4uL0NvbnRlbnRBcmVhJztcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkFwcFwiPlxuICAgICAgICA8SGVhZGVyLz5cbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiQ29udGVudFwiPlxuICAgICAgICAgIDxDb250ZW50QXJlYSBjbGFzc05hbWU9XCJDb250ZW50LUNvbnRhaW5lclwiLz5cbiAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIDxGb290ZXIvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvfi9lc2xpbnQtbG9hZGVyIUQ6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvY29tcG9uZW50cy9Ob3RGb3VuZFBhZ2UvTm90Rm91bmRQYWdlLmpzXG4gKiovIiwiLypcclxuICogUmVhY3QuanMgU3RhcnRlciBLaXRcclxuICogQ29weXJpZ2h0IChjKSAyMDE0IEtvbnN0YW50aW4gVGFya3VzIChAa29pc3R5YSksIEtyaWFTb2Z0IExMQy5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbiAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIGRlZmF1bHRzOiB7XHJcbiAgICBwYWdlOiB7XHJcbiAgICAgIHRpdGxlOiAnSW5zcGlyZScsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnV2ViIEVkaXRvciB0byBjcmVhdGUgd2ViIHByZXNlbnRhdGlvbnMnLFxyXG4gICAgICBrZXl3b3JkczogbnVsbFxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi93b3Jrc3BhY2UvZWRpdG9yL2luc3BpcmUvfi9lc2xpbnQtbG9hZGVyIUQ6L3dvcmtzcGFjZS9lZGl0b3IvaW5zcGlyZS9zcmMvY29uc3RhbnRzL1NldHRpbmdzLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0NvbnRlbnRBcmVhL0NvbnRlbnRBcmVhLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvRm9vdGVyL0Zvb3Rlci5zY3NzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0luc3BpcmVFZGl0b3IvSW5zcGlyZUVkaXRvci5zY3NzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0luc3BpcmVFZGl0b3IvSXRlbUVkaXRvci9JdGVtRWRpdG9yLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvSW5zcGlyZUVkaXRvci9TbGlkZXNWaWV3L1NsaWRlc1ZpZXcuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9JbnNwaXJlRWRpdG9yL1RlbXBsYXRlRGVjay9UZW1wbGF0ZURlY2suc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9JbnNwaXJlRWRpdG9yL1Rvb2xiYXIvVG9vbGJhci5zY3NzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL05hdmJhci9OYXZiYXIuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIwNTg2MmQ2MzRjOTdmNTJkZTQwY2ZhYTI4ZWY0MTNjOS5wbmdcIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9OYXZiYXIvbG9nby1zbWFsbC5wbmdcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRlbWl0dGVyM1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZXZlbnRlbWl0dGVyM1wiXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImV4cHJlc3NcIlxuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmbHV4XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJmbHV4XCJcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnJvbnQtbWF0dGVyXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJmcm9udC1tYXR0ZXJcIlxuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiZnNcIlxuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqYWRlXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJqYWRlXCJcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJsb2Rhc2hcIlxuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJwYXRoXCJcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3VwZXJhZ2VudFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwic3VwZXJhZ2VudFwiXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InNlcnZlci5qcyJ9