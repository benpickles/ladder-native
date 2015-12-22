import Dispatcher from '../Dispatcher'
import State from '../State'

import { LOAD_RESULTS } from '../constants/ResultsConstants'

export default {
  results() {
    return State.get('results')
  },
}

Dispatcher.register(function(payload) {
  switch(payload.type) {
    case LOAD_RESULTS:
      State.merge({
        results: payload.results,
      }).commit()

      break
  }

  return true
})
