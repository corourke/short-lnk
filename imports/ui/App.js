import React from 'react'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'
import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Signup from './Signup'
import Links from './Links'
import Login from './Login'
import NotFound from './NotFound'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Nav bsStyle="pills" activeKey={2}>
            <LinkContainer to="/links">
              <NavItem eventKey={1}>
                Links
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavItem eventKey={2}>
                Login
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/signup">
              <NavItem eventKey={3}>
                Signup
              </NavItem>
            </LinkContainer>
          </Nav>

          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/links" component={Links} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}
