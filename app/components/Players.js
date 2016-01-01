import React from 'react-native'

const {
  ScrollView,
  Text,
} = React

import Loading from './Loading'
import PlayersItem from './PlayersItem'

export default class extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !nextProps.players.equals(this.props.players)
  }

  render() {
    if (this.props.players.isEmpty()) return <Loading />

    const players = this.props.players.map(function(player) {
      return <PlayersItem key={player.get('id')} player={player} />
    })

    return (
      <ScrollView>
        {players}
      </ScrollView>
    )
  }
}
