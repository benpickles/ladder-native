import Dispatcher from '../Dispatcher'
import State from '../State'

import { LOAD_PLAYERS } from '../constants/PlayersConstants'

export default {
  players() {
    const players = State.get('players').sort(function(a, b) {
      return a.get('score') < b.get('score') ? 1 : -1
    })

    let lastScore = null
    let position = 0

    return players.map(function(attributes) {
      const score = attributes.get('score')
      if (lastScore != score) position++
      lastScore = score
      return attributes.set('position', position)
    })
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
