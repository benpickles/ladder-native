const React = require('react-native')

const {
  PickerIOS,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React

import Client from '../client'

var PickerItemIOS = PickerIOS.Item;

export default class extends React.Component {
  constructor() {
    super()

    this.state = {
      players: {}
    }
  }

  componentDidMount() {
    Client.players().then((body) => {
      const players = body.data.reduce((memo, player) => {
        memo[player.id] = player
        return memo
      }, {})

      this.setState({
        players: players,
        selectedWinnerId: null,
        selectedLoserId: null
      })
    })
  }

  submitResult() {
    if (!this.state.selectedWinnerId || !this.state.selectedLoserId) return
    if (this.state.selectedWinnerId == this.state.selectedLoserId) return

    console.log(`${this.state.players[this.state.selectedWinnerId].attributes.name} beat ${this.state.players[this.state.selectedLoserId].attributes.name}`)
  }

  render() {
    return (
      <View style={style.container}>
        <Text>Winner</Text>
        <PickerIOS
          selectedValue={this.state.selectedWinnerId}
          onValueChange={(playerId) => this.setState({selectedWinnerId: playerId})}>
          {Object.keys(this.state.players).map((id) => { return this.state.players[id] }).map((player) => (
            <PickerItemIOS
              key={player.id}
              value={player.id}
              label={player.attributes.name}
            />
          ))}
        </PickerIOS>

        <Text>Loser</Text>
        <PickerIOS
          selectedValue={this.state.selectedLoserId}
          onValueChange={(playerId) => this.setState({selectedLoserId: playerId})}>
          {Object.keys(this.state.players).map((id) => { return this.state.players[id] }).map((player) => (
            <PickerItemIOS
              key={player.id}
              value={player.id}
              label={player.attributes.name}
            />
          ))}
        </PickerIOS>

        <TouchableOpacity
          style={style.button}
          onPress={this.submitResult.bind(this)}
        >
          <Text style={style.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const style = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: 100,
  },
  container: {
    margin: 10,
  },
  buttonText: {
    backgroundColor: '#000000',
    borderRadius: 10,
    color: '#ffffff',
    padding: 10,
    textAlign: 'center',
    width: 100,
  }
});
