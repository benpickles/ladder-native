import Dispatcher from '../Dispatcher'
import Ranker from '../lib/Ranker'
import State from '../State'

import { LOAD_PLAYERS } from '../constants/PlayersConstants'

export default {
  players() {
    return State.get('players')
  },
}

Dispatcher.register(function(payload) {
  switch(payload.type) {
    case LOAD_PLAYERS:
      const lastRanks = State.get('playersLastRank')

      let players = Ranker(payload.players)

      players.forEach(function(player) {
        player.lastRank = lastRanks.get(player.id) || player.rank
      })

      const newRanks = players.reduce(function(memo, player) {
        memo[player.id] = player.rank
        return memo
      }, {})

      State.merge({
        players: players,
        playersLastRank: newRanks,
      }).commit()

      break
  }

  return true
})
