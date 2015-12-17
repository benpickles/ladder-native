const React = require('react-native')
const {
  ListView,
  StyleSheet,
  Text,
  View,
} = React

import Client from '../Client'
import Loading from './Loading'

export default class extends React.Component {
  constructor() {
    super()

    this._dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      dataSource: this._dataSource.cloneWithRows([]),
      loading: true,
    }
  }

  componentDidMount() {
    Client.results().then((results) => {
      this.setState({
        dataSource: this._dataSource.cloneWithRows(results),
        loading: false,
      })
    })
  }

  render() {
    if (this.state.loading) return <Loading />

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={style.list}
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
  list: {
    marginTop: 20,
  },
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
