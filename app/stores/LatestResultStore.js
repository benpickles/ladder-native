import AddResultStore from './AddResultStore'
import ResultsStore from './ResultsStore'

export default {
  loading() {
    return AddResultStore.submitting() || !this.result()
  },

  result() {
    return ResultsStore.results().first()
  },
}
