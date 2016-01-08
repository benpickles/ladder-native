import PlayersActions from './PlayersActions'
import ResultsActions from './ResultsActions'

export default {
  fetch() {
    PlayersActions.fetch()
    ResultsActions.fetch()
  },
}
