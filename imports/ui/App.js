import React from 'react'
import { Meteor } from 'meteor/meteor'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Col, Button, Glyphicon, Grid, Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Signup from './Signup'
import LinkPage from './LinkPage'
import Login from './Login'
import NotFound from './NotFound'

export default class App extends React.Component {
  onSubmit(e) {
    e.preventDefault()
    Meteor.logout((err) => {
      if(err) {
        this.setState({ error: err.reason})
      } else {
        this.props.history.push('/') // eslint-disable-line
      }
    })
  }


  render() {
    return (
      <Router>
        <Grid>
          <Col sm={12} smOffset={0} md={10} mdOffset={1} lg={8} lgOffset={2}>
            <Navbar fluid>
              <Navbar.Header>
                <Navbar.Brand>Short-Lnk</Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
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

                <Navbar.Form pullRight>

                  <Button onClick={this.onSubmit.bind(this)}>
                      Log Out &nbsp;<Glyphicon glyph="log-out" />
                  </Button>
              
                </Navbar.Form>
              </Navbar.Collapse>
            </Navbar>

            <Switch>
              <Redirect exact from="/" to="/login" />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/links" component={LinkPage} />
              <Route component={NotFound} />
            </Switch>
          </Col>
        </Grid>
      </Router>
    )
  }
}
