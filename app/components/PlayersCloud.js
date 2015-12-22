import React from 'react-native'

const {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React

export default class extends React.Component {
  handleSelect(player) {
    this.props.onSelect(player.id)
  }

  render() {
    const players = this.props.players.toJS().map((player) => {
      return this.renderPlayer(player)
    })

    return (
      <View style={style.container}>
        {players}
      </View>
    )
  }

  renderPlayer(player) {
    let styles = [style.player]

    if (player.id == this.props.selected) {
      styles.push({
        backgroundColor: this.props.selectedColor,
      })
    }

    return (
      <TouchableOpacity
        key={player.id}
        onPress={() => this.handleSelect(player)}
        style={styles}
      >
        <Text style={style.name}>{player.name}</Text>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 10,
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
})
