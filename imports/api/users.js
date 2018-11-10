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
}, {
  clean: {
    filter: true,
    mutate: true,
    trimStrings: true,
    removeEmptyStrings: false,
  },
}, { tracker: Tracker })

export const ValidationContext = schema.namedContext('userContext')

export function validateUser(user) {
  return ValidationContext.validate(user)
}

// --- Server Side --- //

// The user object is the Mongo document
export function setServerUserValidation() {
  Accounts.validateNewUser((user) => {
    ValidationContext.validate({ user })
    return true
  })
}
