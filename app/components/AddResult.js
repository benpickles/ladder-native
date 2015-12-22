import React from 'react-native'

const {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React

import AddResultActions from '../actions/AddResultActions'
import Client from '../Client'
import Loading from './Loading'
import PlayersActions from '../actions/PlayersActions'
import PlayersCloud from './PlayersCloud'

export default class extends React.Component {
  componentDidMount() {
    PlayersActions.fetch()
  }

  handleLoser(id) {
    AddResultActions.setLoser(id)
  }

  handleSubmit() {
    AddResultActions.submit(
      this.props.winnerId,
      this.props.loserId
    )
  }

  handleWinner(id) {
    AddResultActions.setWinner(id)
  }

  render() {
    const {
      loserId,
      players,
      submitting,
      winnerId,
    } = this.props

    if (players.isEmpty()) return <Loading />
    if (submitting) return <Loading />

    return (
      <View style={style.container}>
        <View style={style.playersContainer}>
          <Text style={style.label}>Winner</Text>
          <View style={style.players}>
            <PlayersCloud
              onSelect={this.handleWinner}
              players={players}
              selected={winnerId}
              selectedColor="#00cc00"
            />
          </View>
        </View>
        <View style={style.playersContainer}>
          <Text style={style.label}>Second</Text>
          <View style={style.players}>
            <PlayersCloud
              onSelect={this.handleLoser}
              players={players}
              selected={loserId}
              selectedColor="#cc0000"
            />
          </View>
        </View>
        <View style={style.buttonRow}>
          <TouchableOpacity onPress={() => this.handleSubmit()} style={style.buttonContainer}>
            <Text style={style.buttonText}>Add Result</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#1990B8',
    borderRadius: 30,
    marginTop: 40,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 32,
  },
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
