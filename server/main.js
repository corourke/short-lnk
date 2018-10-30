import { Meteor } from 'meteor/meteor'

import { setServerUserValidation } from '../imports/api/users'
import '../imports/api/links'

Meteor.startup(() => {
  // code to run on server at startup
  setServerUserValidation()
})
