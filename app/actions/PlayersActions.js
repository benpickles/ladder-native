import Dispatcher from '../Dispatcher'
import Client from '../Client'
import PlayersStore from '../stores/PlayersStore'

import {
  LOADED_PLAYERS,
  LOADING_PLAYERS,
} from '../constants/PlayersConstants'

export default {
  fetch() {
    if (PlayersStore.loading()) return

    Dispatcher.dispatch({
      type: LOADING_PLAYERS,
    })

    return Client.players().then(function(players) {
      Dispatcher.dispatch({
        type: LOADED_PLAYERS,
        players: players,
      })
    })
  },
}
