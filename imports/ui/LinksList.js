import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Panel } from 'react-bootstrap'

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
        <Panel key={i._id} className='link'>
          <Panel.Heading>{i.name}</Panel.Heading>
          <Panel.Body>Short URL: <a href={i._id}>http://localhost:3000/{i._id}</a></Panel.Body>
        </Panel>
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
