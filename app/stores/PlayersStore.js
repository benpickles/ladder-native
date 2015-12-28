import Dispatcher from '../Dispatcher'
import Ranker from '../lib/Ranker'
import State from '../State'

import { LOAD_PLAYERS } from '../constants/PlayersConstants'

export default {
  players() {
    return Ranker(State.get('players'))
  },
}

Dispatcher.register(function(payload) {
  switch(payload.type) {
    case LOAD_PLAYERS:
      State.merge({
        players: payload.players,
      }).commit()

      break
  }

  return true
})
