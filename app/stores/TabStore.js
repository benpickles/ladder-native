import Dispatcher from '../Dispatcher'
import State from '../State'

import { PLAYERS, SELECT_TAB } from '../constants/TabConstants'
import { SUBMITTING_RESULT } from '../constants/AddResultConstants'

export default {
  isSelected(tab) {
    return this.selected() == tab
  },

  selected() {
    return State.get('selectedTab')
  },
}

Dispatcher.register(function(payload) {
  switch(payload.type) {
    case SELECT_TAB:
      State.set('selectedTab', payload.tab).commit()
      break

    case SUBMITTING_RESULT:
      State.set('selectedTab', PLAYERS).commit()
      break
  }

  return true
})
