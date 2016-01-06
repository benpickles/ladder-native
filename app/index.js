import React from 'react-native'

const {
  StyleSheet,
  TabBarIOS,
  View,
} = React

import AddResult from './components/AddResult'
import AddResultStore from './stores/AddResultStore'
import Header from './components/Header'
import LatestResultStore from './stores/LatestResultStore'
import Players from './components/Players'
import PlayersActions from './actions/PlayersActions'
import PlayersStore from './stores/PlayersStore'
import Results from './components/Results'
import ResultsActions from './actions/ResultsActions'
import ResultsStore from './stores/ResultsStore'
import State from './State'
import TabActions from './actions/TabActions'
import TabStore from './stores/TabStore'

import {
  ADD_RESULT,
  PLAYERS,
  RESULTS
} from './constants/TabConstants'

export default class extends React.Component {
  componentDidMount() {
    State.onCommit(() => this.forceUpdate())

    setTimeout(function() {
      PlayersActions.fetch()
      ResultsActions.fetch()
    }, 0)
  }

  render() {
    return (
      <View style={style.container}>
        <Header
          loading={LatestResultStore.loading()}
          result={LatestResultStore.result()}
        />
        {this.renderTabs()}
      </View>
    )
  }

  renderTabs() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          icon={require('./icons/rankings.png')}
          onPress={() => TabActions.select(PLAYERS)}
          selected={TabStore.isSelected(PLAYERS)}
          title="Players"
        >
          <Players
            loading={PlayersStore.loading()}
            players={PlayersStore.players()}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./icons/add-result.png')}
          onPress={() => TabActions.select(ADD_RESULT)}
          selected={TabStore.isSelected(ADD_RESULT)}
          title="Add Result"
        >
          <AddResult
            loserId={AddResultStore.loser()}
            players={AddResultStore.players()}
            submitting={AddResultStore.submitting()}
            winnerId={AddResultStore.winner()}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./icons/results.png')}
          onPress={() => TabActions.select(RESULTS)}
          selected={TabStore.isSelected(RESULTS)}
          title="Results"
        >
          <Results results={ResultsStore.results()} />
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
})
