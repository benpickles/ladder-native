import Client from '../Client'
import Dispatcher from '../Dispatcher'

import { LOAD_RESULTS } from '../constants/ResultsConstants'

let FETCHING = false

export default {
  fetch() {
    if (FETCHING) return

    FETCHING = true

    Client.results().then(function(results) {
      FETCHING = false

      Dispatcher.dispatch({
        type: LOAD_RESULTS,
        results: results,
      })
    })
  }
}
