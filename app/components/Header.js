import React from 'react-native'

const {
  PixelRatio,
  StyleSheet,
  Text,
  View,
} = React

import Loading from './Loading'

export default function(props) {
  const { loading, result } = props
  let inner

  if (loading) {
    inner = <Loading />
  } else {
    inner = (
      <View style={style.result}>
        <Text style={[style.player, style.winner]}>{result.get('winner')}</Text>
        <Text style={style.beat}>beat</Text>
        <Text style={[style.player, style.loser]}>{result.get('loser')}</Text>
      </View>
    )
  }

  return (
    <View style={style.container}>
      {inner}
    </View>
  )
}

const style = StyleSheet.create({
  beat: {
    flex: 1,
    fontSize: 25,
    maxWidth: 80,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#f7f7f7',
    borderBottomColor: '#b2b2b2',
    borderBottomWidth: 1 / PixelRatio.get(),
    height: 98,
    paddingTop: 19,
  },
  loser: {
    textAlign: 'left',
  },
  player: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
  },
  result: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  winner: {
    textAlign: 'right',
  },
})
