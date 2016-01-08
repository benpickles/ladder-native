import Client from '../Client'
import Dispatcher from '../Dispatcher'
import ResultsStore from '../stores/ResultsStore'

import {
  LOADED_RESULTS,
  LOADING_RESULTS,
} from '../constants/ResultsConstants'

export default {
  fetch() {
    if (ResultsStore.loading()) return

    Dispatcher.dispatch({
      type: LOADING_RESULTS,
    })

    Client.results().then(function(results) {
      Dispatcher.dispatch({
        type: LOADED_RESULTS,
        results: results,
      })
    })
  }
}
