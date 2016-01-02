import Blob from './Blob'

import { PLAYERS } from './constants/TabConstants'

export default new Blob({
  selectedTab: PLAYERS,

  players: [],
  playersLastRank: {},

  results: [],

  addResultSubmitting: false,
  loserId: null,
  winnerId: null,
})
