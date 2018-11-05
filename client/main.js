import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import App from '../imports/ui/App.js'
import { Links } from '../imports/api/links'


Tracker.autorun( () => {
  let links = Links.find().fetch()
  console.log("New Links: ", links) // eslint-disable-line
})

Meteor.startup(function () {
  ReactDOM.render(<App />, document.getElementById('app'))
})
