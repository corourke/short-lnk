import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'

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
        <LinksListItem key={link._id} {...link} />
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
