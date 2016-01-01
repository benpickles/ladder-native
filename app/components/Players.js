import React from 'react-native'

const {
  ScrollView,
  StyleSheet,
  Text,
} = React

import Loading from './Loading'
import PlayersActions from '../actions/PlayersActions'
import PlayersItem from './PlayersItem'

export default class extends React.Component {
  componentDidMount() {
    PlayersActions.fetch()
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.players.equals(this.props.players)
  }

  render() {
    if (this.props.players.isEmpty()) return <Loading />

    const players = this.props.players.map(function(player) {
      return <PlayersItem key={player.get('id')} player={player} />
    })

    return (
      <ScrollView style={style.list}>
        {players}
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  list: {
    paddingTop: 20,
  },
})
