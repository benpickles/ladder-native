import Dispatcher from '../Dispatcher'
import Client from '../Client'

import { LOADED_PLAYERS } from '../constants/PlayersConstants'

let FETCHING = false

export default {
  fetch() {
    if (FETCHING) return

    FETCHING = true

    Client.players().then(function(players) {
      FETCHING = false

      Dispatcher.dispatch({
        type: LOADED_PLAYERS,
        players: players,
      })
    })
  },
}
