import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'

import '../imports/startup/simple-schema-configuration.js'
import App from '../imports/ui/App.js'


Meteor.startup(function () {
  ReactDOM.render(<App />, document.getElementById('app'))
})
