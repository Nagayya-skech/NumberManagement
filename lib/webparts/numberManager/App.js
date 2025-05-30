import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import AssignedNumbers from './AssignedNumbers';
import AvailableNumbers from './AvailableNumbers';
//import { SidebarProvider } from 'react-sidebar';
var App = function () {
    return (
    //<SidebarProvider>
    React.createElement(Router, null,
        React.createElement("nav", { style: { display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: 'green' } },
            React.createElement("ul", { style: { listStyleType: 'none', display: 'flex', gap: '10px', width: '100%' } },
                React.createElement("li", { style: { flex: 1 } },
                    React.createElement(Link, { to: "/", style: { color: 'yellow', textDecoration: 'none', borderBottom: '2px solid transparent' } }, "Home")),
                React.createElement("li", { style: { flex: 1 } },
                    React.createElement(Link, { to: "/assigned-numbers", style: { color: 'yellow', textDecoration: 'none', borderBottom: '2px solid transparent' } }, "Assigned Numbers")),
                React.createElement("li", { style: { flex: 1 } },
                    React.createElement(Link, { to: "/available-numbers", style: { color: 'yellow', textDecoration: 'none', borderBottom: '2px solid transparent' } }, "Available Numbers")))),
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
            React.createElement(Route, { path: "/assigned-numbers", element: React.createElement(AssignedNumbers, null) }),
            React.createElement(Route, { path: "/available-numbers", element: React.createElement(AvailableNumbers, null) })))
    //</SidebarProvider>
    );
};
export default App;
//# sourceMappingURL=App.js.map