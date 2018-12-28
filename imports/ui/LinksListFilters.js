import { Session } from 'meteor/session'

import React from 'react'

export default class LinksListFilters extends React.Component {
  render() {
    return(

      <div>
        <label>
          <input type='checkbox' onChange={(e) => {
            Session.set('showHidden', e.target.checked)
          }} />
          &nbsp;Show hidden links
        </label>
      </div>

    )
  }
}
