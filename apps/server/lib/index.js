"use strict";

require("core-js");
var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
var _component = require("@loadable/component");
var _App = _interopRequireDefault(require("./App"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-extraneous-dependencies

(0, _component.loadableReady)(() => {
  const rootElement = document.getElementById('main');
  (0, _client.hydrateRoot)(rootElement, /*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(_App.default, null)));
});