import Dispatcher from '../Dispatcher'
import State from '../State'

import {
  SET_LOSER,
  SET_WINNER,
  SUBMITTED_RESULT,
  SUBMITTING_RESULT,
} from '../constants/AddResultConstants'

const Store = {
  loser() {
    return State.get('loserId')
  },

  players() {
    return State.get('players').sort(function(a, b) {
      return a.get('name').toLowerCase() > b.get('name').toLowerCase() ? 1 : -1
    })
  },

  submitting() {
    return State.get('addResultSubmitting')
  },

  winner() {
    return State.get('winnerId')
  },
}

Dispatcher.register(function(payload) {
  switch(payload.type) {
    case SET_LOSER:
      State.merge({
        loserId: payload.id,
      }).commit()

      break

    case SET_WINNER:
      State.merge({
        winnerId: payload.id,
      }).commit()

      break

    case SUBMITTED_RESULT:
      State.merge({
        addResultSubmitting: false,
        loserId: null,
        winnerId: null,
      }).commit()

      break

    case SUBMITTING_RESULT:
      State.merge({
        addResultSubmitting: true,
      }).commit()

      break
  }

  return true
})

export default Store
