import Dispatcher from '../Dispatcher'
import State from '../State'

import {
  LOADED_RESULTS,
  LOADING_RESULTS,
} from '../constants/ResultsConstants'

export default {
  loading() {
    return State.get('resultsLoading')
  },

  results() {
    return State.get('results')
  },
}

Dispatcher.register(function(payload) {
  switch(payload.type) {
    case LOADED_RESULTS:
      State.merge({
        results: payload.results,
        resultsLoading: false,
      }).commit()

      break

    case LOADING_RESULTS:
      State.merge({
        resultsLoading: true,
      })

      break
  }

  return true
})
