import React from 'react-native'

const {
  ListView,
  StyleSheet,
  Text,
  View,
} = React

import Loading from './Loading'

export default class extends React.Component {
  constructor() {
    super()

    this._dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
  }

  render() {
    const { results } = this.props

    if (results.isEmpty()) return <Loading />

    const dataSource = this._dataSource.cloneWithRows(results.toJS())

    return (
      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow}
      />
    )
  }

  renderRow(row) {
    return (
      <View style={style.row}>
        <Text style={style.winner}>{row.winner}</Text>
        <Text style={style.transfer}>{row.transfer}</Text>
        <Text style={style.loser}>{row.loser}</Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  loser: {
    flex: 1,
    textAlign: 'left',
    fontSize: 25,
    paddingLeft: 25,
  },
  transfer: {
    flex: 1,
    maxWidth: 50,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  winner: {
    flex: 1,
    textAlign: 'right',
    fontSize: 25,
    paddingRight: 25,
  },
});
