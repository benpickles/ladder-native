import React from 'react-native'

const {
  RefreshControl,
  ScrollView,
} = React

import PlayersActions from '../actions/PlayersActions'
import PlayersList from './PlayersList'

export default class extends React.Component {
  handleRefresh() {
    PlayersActions.fetch()
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={this.handleRefresh}
            refreshing={this.props.loading}
          />
        }
      >
        <PlayersList players={this.props.players} />
      </ScrollView>
    )
  }
}
