var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import AssignedNumbers from './AssignedNumbers';
import AvailableNumbers from './AvailableNumbers';
import styles from './NumberManager.module.scss';
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
        // Add your state properties here
        };
        return _this;
    }
    App.prototype.render = function () {
        return (
        //<SidebarProvider>
        React.createElement(Router, null,
            React.createElement("nav", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                }, className: styles.topNavigation },
                React.createElement("ul", { style: {
                        listStyleType: 'none',
                        display: 'flex',
                        gap: '10px',
                        width: '100%',
                    } },
                    React.createElement("li", { style: { flex: 1 } },
                        React.createElement(Link, { className: "".concat(styles.links), to: "/", style: {
                                textDecoration: 'none',
                                borderBottom: '2px solid transparent',
                            } }, "Home")),
                    React.createElement("li", { style: { flex: 1 } },
                        React.createElement(Link, { className: "".concat(styles.links), to: "/assigned-numbers", style: {
                                textDecoration: 'none',
                                borderBottom: '2px solid transparent',
                            } }, "Assigned Numbers")),
                    React.createElement("li", { style: { flex: 1 } },
                        React.createElement(Link, { className: "".concat(styles.links), to: "/available-numbers", style: {
                                textDecoration: 'none',
                                borderBottom: '2px solid transparent',
                            } }, "Unassigned Numbers")))),
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/", element: React.createElement(Home, __assign({}, this.props)) }),
                React.createElement(Route, { path: "/assigned-numbers", element: React.createElement(AssignedNumbers, __assign({}, this.props)) }),
                React.createElement(Route, { path: "/available-numbers", element: React.createElement(AvailableNumbers, __assign({}, this.props)) })))
        //</SidebarProvider>
        );
    };
    return App;
}(React.Component));
export default App;
//# sourceMappingURL=App.js.map