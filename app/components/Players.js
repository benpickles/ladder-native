import React from 'react-native'

const {
  RefreshControl,
  ScrollView,
} = React

import ApiActions from '../actions/ApiActions'
import Loading from './Loading'
import PlayersList from './PlayersList'

export default class extends React.Component {
  handleRefresh() {
    ApiActions.fetch()
  }

  render() {
    if (this.props.players.isEmpty()) return <Loading />

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
