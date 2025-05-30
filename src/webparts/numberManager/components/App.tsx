import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import AssignedNumbers from './AssignedNumbers';
import AvailableNumbers from './AvailableNumbers';
import styles from './NumberManager.module.scss';
//import { SidebarProvider } from 'react-sidebar';

import { INumberManagerProps, INumberManagerState } from './INumberManagerProps';

class App extends React.Component<INumberManagerProps, INumberManagerState> {
  constructor(props: INumberManagerProps) {
    super(props);
    
    this.state = {
      // Add your state properties here
    };
  }

  render() {
    return (
      //<SidebarProvider>
      <Router>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
          className={styles.topNavigation}
        >
          <ul
            style={{
              listStyleType: 'none',
              display: 'flex',
              gap: '10px',
              width: '100%',
            }}
          >
            <li style={{ flex: 1 }}>
              <Link
                className={`${styles.links}`}
                to="/"
                style={{
                  textDecoration: 'none',
                  borderBottom: '2px solid transparent',
                }}
              >
                Home
              </Link>
            </li>
            <li style={{ flex: 1 }}>
              <Link
                className={`${styles.links}`}
                to="/assigned-numbers"
                style={{
                  textDecoration: 'none',
                  borderBottom: '2px solid transparent',
                }}
              >
                Assigned Numbers
              </Link>
            </li>
            <li style={{ flex: 1 }}>
              <Link
                className={`${styles.links}`}
                to="/available-numbers"
                style={{
                  textDecoration: 'none',
                  borderBottom: '2px solid transparent',
                }}
              >
                Unassigned Numbers
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home {...this.props} />} />
          <Route path="/assigned-numbers" element={<AssignedNumbers { ...this.props}/>} />
          <Route path="/available-numbers" element={<AvailableNumbers {...this.props} />} />
        </Routes>
      </Router>
      //</SidebarProvider>
    );
  }
}

export default App;