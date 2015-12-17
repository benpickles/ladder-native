const React = require('react-native')
const {
  ListView,
  StyleSheet,
  Text,
  View,
} = React

import Client from '../client'

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
      const rows = body.data
        .map((result) => result.attributes)

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
        <Text style={style.transfer}>{row.transfer}</Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  transfer: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
