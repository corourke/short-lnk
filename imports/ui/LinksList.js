import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Button, Col, Form, FormGroup, PageHeader } from 'react-bootstrap'

import { Links } from '../api/links'



export default class LinksList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      links: [],
    }
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun( () => {
      Meteor.subscribe('links')
      let links = Links.find().fetch()
      this.setState({ links })
    })
  }
  componentWillUnmount() {
    this.linksTracker.stop()
  }

  renderLinksList() {
    return this.state.links.map( (i) => {
      return (
        <p key={i._id}>{i.url}</p>
      )
    } )
  }

  render() {
    return(
      <div>
        {this.renderLinksList()}
      </div>
    )
  }
}
