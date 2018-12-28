import React from 'react'
import { Redirect } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

import LinkForm from './LinkForm'
import LinksList from './LinksList'
import PrivateHeader from './PrivateHeader'
import LinksListFilters from './LinksListFilters'

export default class LinkPage extends React.Component {

  render() {
    if(Meteor.userId() == null) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <PrivateHeader>Links</PrivateHeader>
        <LinksListFilters />
        <LinkForm />
        <LinksList />
      </div>
    )
  }
}
