import React from 'react-native'

const {
  TabBarIOS,
} = React

import AddResult from './components/AddResult'
import Players from './components/Players'
import Results from './components/Results'
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
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          icon={require('./icons/rankings.png')}
          onPress={() => TabActions.select(PLAYERS)}
          selected={TabStore.isSelected(PLAYERS)}
          title="Players"
        >
          <Players />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./icons/add-result.png')}
          onPress={() => TabActions.select(ADD_RESULT)}
          selected={TabStore.isSelected(ADD_RESULT)}
          title="Add Result"
        >
          <AddResult />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./icons/results.png')}
          onPress={() => TabActions.select(RESULTS)}
          selected={TabStore.isSelected(RESULTS)}
          title="Results"
        >
          <Results />
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}
