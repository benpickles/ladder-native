import React from 'react-native'

const {
  PixelRatio,
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
    const lastRank = player.get('lastRank')
    const rank = player.get('rank')
    const diff = lastRank - rank

    let changeColour = null
    let changeText = null

    if (diff < 0) {
      changeColour = '#ff0000'
      changeText = diff
    } else if (diff > 0) {
      changeColour = '#00ff00'
      changeText = `+${diff}`
    }

    const changeStyle = [
      style.change,
      { color: changeColour },
    ]

    return (
      <View style={style.row}>
        <Text style={changeStyle}>{changeText}</Text>
        <Text style={style.rank}>{rank}</Text>
        <Text style={style.name}>{player.get('name')}</Text>
        <Text style={style.score}>{player.get('score')}</Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  change: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'right',
    width: 40,
  },
  name: {
    flex: 1,
    fontSize: 25,
    textAlign: 'left',
  },
  rank: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 15,
    textAlign: 'right',
    width: 40,
  },
  row: {
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1 / PixelRatio.get(),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 15,
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
