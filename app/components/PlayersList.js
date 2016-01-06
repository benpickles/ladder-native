import React from 'react-native'

const {
  LayoutAnimation,
  View,
} = React

import PlayersItem from './PlayersItem'

export default class extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !nextProps.players.equals(this.props.players)
  }

  render() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)

    const players = this.props.players.map(function(player) {
      return <PlayersItem key={player.get('id')} player={player} />
    })

    return (
      <View>
        {players}
      </View>
    )
  }
}
