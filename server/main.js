import { Meteor } from 'meteor/meteor'

import { setServerUserValidation } from '../imports/api/users'
import '../imports/api/links'
import '../imports/startup/simple-schema-configuration.js'

Meteor.startup(() => {
  // code to run on server at startup
  setServerUserValidation()
})
