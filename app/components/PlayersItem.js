import React from 'react-native'

const {
  StyleSheet,
  Text,
  View,
} = React

export default class extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !nextProps.player.equals(this.props.player)
  }

  render() {
    const player = this.props.player

    return (
      <View style={style.row}>
        <Text style={style.rank}>{player.get('rank')}</Text>
        <Text style={style.name}>{player.get('name')}</Text>
        <Text style={style.score}>{player.get('score')}</Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  name: {
    flex: 1,
    fontSize: 25,
    textAlign: 'left',
  },
  rank: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  row: {
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
  },
  score: {
    flex: 1,
    fontSize: 15,
    paddingTop: 5,
    textAlign: 'right',
  },
})
