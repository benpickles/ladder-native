import React from 'react-native'

const {
  StyleSheet,
  Text,
  View,
} = React

import Client from '../Client'
import Loading from './Loading'
import PlayersCloud from './PlayersCloud'

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

    return (
      <View style={style.container}>
        <View style={style.playersContainer}>
          <Text style={style.label}>Winner</Text>
          <View style={style.players}>
            <PlayersCloud
              onSelect={(id) => this.selectWinner(id)}
              players={this.state.players}
              selected={this.state.winner_id}
              selectedColor="#00cc00"
            />
          </View>
        </View>
        <View style={style.playersContainer}>
          <Text style={style.label}>Second</Text>
          <View style={style.players}>
            <PlayersCloud
              onSelect={(id) => this.selectLoser(id)}
              players={this.state.players}
              selected={this.state.loser_id}
              selectedColor="#cc0000"
            />
          </View>
        </View>
      </View>
    )
  }

  selectLoser(id) {
    if (id == this.state.loser_id) id = null

    this.setState({
      loser_id: id,
    })

    this.submitResult()
  }

  selectWinner(id) {
    if (id == this.state.winner_id) id = null

    this.setState({
      winner_id: id,
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
})
