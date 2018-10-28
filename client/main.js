import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'

import { Links } from '../imports/api/links'
import App from '../imports/ui/App.js'

Meteor.startup(function () {
  ReactDOM.render(<App />, document.getElementById('app'))
})
