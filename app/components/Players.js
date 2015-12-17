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
      <View style={styles.row}>
        <Text style={styles.position}>{row.position}</Text>
        <Text style={styles.name}>{row.name}</Text>
        <Text style={styles.score}>{row.score}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  position: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  name: {
    flex: 1,
    textAlign: 'center',
  },
  score: {
    flex: 1,
    textAlign: 'right',
  },
});
