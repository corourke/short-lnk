import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

import '../imports/startup/simple-schema-configuration.js'
import App from '../imports/ui/App.js'


Meteor.startup(function () {
  Session.set('showHidden', false)
  ReactDOM.render(<App />, document.getElementById('app'))
})
