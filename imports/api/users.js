import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Tracker } from 'meteor/tracker'
import SimpleSchema from 'simpl-schema'

SimpleSchema.debug = true

export const schema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  password: {
    type: String,
    min: 4,
  },
  fullName: {
    type: String,
    optional: true,
  },
},{
  clean: {
    filter: true,
    mutate: true,
    trimStrings: true,
    removeEmptyStrings: false,
  },
},{ tracker: Tracker })

export const userValidationContext = schema.namedContext('userContext')

export function validateUser(user) {
  return userValidationContext.validate(user)
}

// --- Server Side --- //

// The user object is the Mongo document
export function setServerUserValidation() {
  Accounts.validateNewUser((user) => {
    console.log('in validateNewuser: ', user)
    const email = user.emails[0].address
    console.log('   email: ', email)
    userValidationContext.validate({ email })
    if(userValidationContext.keyIsInvalid('email')) {
      throw new Meteor.Error(400, userValidationContext.keyErrorMessage('email'))
    } else {
      return true
    }
  })
}
