import { Meteor } from 'meteor/meteor'

import { setServerUserValidation } from '../imports/api/users'

Meteor.startup(() => {
  // code to run on server at startup
  setServerUserValidation()
})
