import React from 'react-native'

const {
  ScrollView,
} = React

import Loading from './Loading'
import PlayersList from './PlayersList'

export default class extends React.Component {
  render() {
    if (this.props.players.isEmpty()) return <Loading />

    return (
      <ScrollView>
        <PlayersList players={this.props.players} />
      </ScrollView>
    )
  }
}
