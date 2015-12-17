const React = require('react-native')
const {
  ListView,
  Text,
  View,
} = React

import Client from './client'

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
    Client.players().then((body) => {
      const rows = body.data
        .map((player) => player.attributes)
        .sort((a, b) => {
          return a.score < b.score ? 1 : -1
        })

      let lastScore = null
      let position = 0

      rows.forEach((attributes) => {
        if (lastScore != attributes.score) position++
        attributes.position = position
        lastScore = attributes.score
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
      <View>
        <Text>{row.position}</Text>
        <Text>{row.name}</Text>
      </View>
    )
  }
}
