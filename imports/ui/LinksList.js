import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import { Col, Grid, Row } from 'react-bootstrap'

import { Links } from '../api/links'
import LinksListItem from './LinksListItem'


export default class LinksList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      links: [],
    }
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun( () => {
      Meteor.subscribe('links')
      let links = Links.find({
        visible: !Session.get('showHidden'),
      }).fetch()
      this.setState({ links })
    })
  }
  componentWillUnmount() {
    this.linksTracker.stop()
  }

  renderLinksList() {
    return this.state.links.map( (link) => {
      return (
        <Col key={link._id} xs={12} md={6} lg={6}>
          <LinksListItem key={link._id} {...link} />
        </Col>
      )
    })
  }

  render() {
    return(
      <div>
        {this.renderLinksList()}
      </div>
    )
  }
}
