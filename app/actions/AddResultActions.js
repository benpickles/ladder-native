import Client from '../Client'
import Dispatcher from '../Dispatcher'
import PlayersActions from './PlayersActions'
import ResultsActions from './ResultsActions'
import TabActions from './TabActions'

import {
  SET_LOSER,
  SET_WINNER,
  SUBMITTED_RESULT,
  SUBMITTING_RESULT,
} from '../constants/AddResultConstants'

import { PLAYERS } from '../constants/TabConstants'

export default {
  setLoser(id) {
    Dispatcher.dispatch({
      type: SET_LOSER,
      id: id,
    })
  },

  setWinner(id) {
    Dispatcher.dispatch({
      type: SET_WINNER,
      id: id,
    })
  },

  submit(winnerId, loserId) {
    Dispatcher.dispatch({
      type: SUBMITTING_RESULT,
    })

    Client.createResult(winnerId, loserId).then(function() {
      Dispatcher.dispatch({
        type: SUBMITTED_RESULT,
      })

      PlayersActions.fetch()
      ResultsActions.fetch()
    })
  },
}
