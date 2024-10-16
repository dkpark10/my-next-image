"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import { Route, Routes, Link } from 'react-router-dom';

function Post() {
  return /*#__PURE__*/_react.default.createElement("div", null, "post");
}
function Viewer() {
  return /*#__PURE__*/_react.default.createElement("div", null, "viewer");
}
function App() {
  const [count, setCount] = (0, _react.useState)(0);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => setCount(prev => prev + 1)
  }, "123 hydration"), /*#__PURE__*/_react.default.createElement("div", null, count), /*#__PURE__*/_react.default.createElement(Post, null), /*#__PURE__*/_react.default.createElement(Viewer, null));
}