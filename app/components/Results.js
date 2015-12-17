const React = require('react-native')
const {
  ListView,
  StyleSheet,
  Text,
  View,
} = React

import Client from '../Client'

export default class extends React.Component {
  constructor() {
    super()

    this._dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      dataSource: this._dataSource.cloneWithRows([]),
    }
  }

  componentDidMount() {
    Client.results().then((body) => {
      const players = body.included.reduce((memo, player) => {
        memo[player.id] = player.attributes
        return memo
      }, {})

      const rows = body.data
        .map((result) => {
          const winnerId = result.relationships.winner.data.id
          const loserId = result.relationships.loser.data.id

          return {
            loser: players[loserId].name,
            transfer: result.attributes.transfer,
            winner: players[winnerId].name,
          }
        })

      this.setState({
        dataSource: this._dataSource.cloneWithRows(rows),
      })
    })
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
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
    marginLeft: 10,
    marginRight: 10,
  },
  loser: {
    flex: 1,
  },
  name: {
    fontSize: 32,
  },
  transfer: {
    flex: 1,
    maxWidth: 50,
    textAlign: 'center',
  },
  winner: {
    flex: 1,
    textAlign: 'right',
  },
});
