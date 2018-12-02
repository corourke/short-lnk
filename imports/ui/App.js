import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Col, Grid } from 'react-bootstrap'

import Signup from './Signup'
import LinkPage from './LinkPage'
import Login from './Login'
import NotFound from './NotFound'

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Grid>
          <Col sm={12} smOffset={0} md={10} mdOffset={1} lg={8} lgOffset={2}>
            <Switch>
              // Middleware first checks for a shortlink match in the database
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
