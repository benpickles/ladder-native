import Dispatcher from '../Dispatcher'
import State from '../State'

import { LOADED_RESULTS } from '../constants/ResultsConstants'

export default {
  results() {
    return State.get('results')
  },
}

Dispatcher.register(function(payload) {
  switch(payload.type) {
    case LOADED_RESULTS:
      State.merge({
        results: payload.results,
      }).commit()

      break
  }

  return true
})
