import Dispatcher from '../Dispatcher'
import State from '../State'

import { SELECT_TAB } from '../constants/TabConstants'

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
  }

  return true
})
