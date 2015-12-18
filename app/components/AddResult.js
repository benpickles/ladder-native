import React from 'react-native'

const {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React

import Client from '../Client'
import Loading from './Loading'

export default class extends React.Component {
  constructor() {
    super()

    this.state = {
      loading: true,
      loser_id: null,
      players: [],
      winner_id: null,
    }
  }

  componentDidMount() {
    Client.playersByName().then((players) => {
      this.setState({
        loading: false,
        players: players,
      })
    })
  }

  render() {
    if (this.state.loading) return <Loading />

    const winners = this.renderWinners()
    const losers = this.renderLosers()

    return (
      <View style={style.container}>
        <View style={style.playersContainer}>
          <Text style={style.label}>Winner</Text>
          <View style={style.players}>
            {winners}
          </View>
        </View>
        <View style={style.playersContainer}>
          <Text style={style.label}>Second</Text>
          <View style={style.players}>
            {losers}
          </View>
        </View>
      </View>
    )
  }

  renderLosers() {
    return this.state.players.map((player) => {
      const selectedStyle = player.id == this.state.loser_id
        ? style.selectedLoser
        : null

      return this.renderPlayer(player, selectedStyle, this.selectLoser.bind(this))
    })
  }

  renderPlayer(player, selectedStyle, callback) {
    let styles = [style.player, selectedStyle]

    return (
      <TouchableOpacity
        key={player.id}
        onPress={() => callback(player)}
        style={styles}
      >
        <Text style={style.name}>{player.name}</Text>
      </TouchableOpacity>
    )
  }

  renderWinners() {
    return this.state.players.map((player) => {
      const selectedStyle = player.id == this.state.winner_id
        ? style.selectedWinner
        : null

      return this.renderPlayer(player, selectedStyle, this.selectWinner.bind(this))
    })
  }

  selectLoser(player) {
    let playerId = player.id
    if (playerId == this.state.loser_id) playerId = null

    this.setState({
      loser_id: playerId,
    })

    this.submitResult()
  }

  selectWinner(player) {
    let playerId = player.id
    if (playerId == this.state.winner_id) playerId = null

    this.setState({
      winner_id: playerId,
    })

    this.submitResult()
  }

  submitResult() {
    const winnerId = this.state.winner_id
    const loserId = this.state.loser_id

    if (!winnerId || !loserId) return
    if (winnerId == loserId) return

    this.setState({
      loading: true,
    })

    Client.createResult(winnerId, loserId)
      .then(() => {
        this.setState({
          loading: false,
          loser_id: null,
          winner_id: null,
        })
      })
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
  label: {
    fontSize: 32,
    textAlign: 'center',
  },
  name: {
    fontSize: 32,
  },
  player: {
    backgroundColor: '#dddddd',
    borderRadius: 30,
    margin: 10,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
  players: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 10,
  },
  playersContainer: {
    paddingTop: 30,
  },
  selectedLoser: {
    backgroundColor: '#cc0000',
  },
  selectedWinner: {
    backgroundColor: '#00cc00',
  },
})
