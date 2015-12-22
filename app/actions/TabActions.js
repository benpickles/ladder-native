import Dispatcher from '../Dispatcher'

import { SELECT_TAB } from '../constants/TabConstants'

export default {
  select(tab) {
    Dispatcher.dispatch({
      type: SELECT_TAB,
      tab: tab,
    })
  }
}
