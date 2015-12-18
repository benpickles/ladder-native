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
    Client.playersByPosition().then((players) => {
      this.setState({
        dataSource: this._dataSource.cloneWithRows(players),
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
        style={styles.list}
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
  list: {
    marginTop: 20,
  },
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
  position: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 25,
  },
  name: {
    flex: 1,
    textAlign: 'left',
    fontSize: 25,
  },
  score: {
    flex: 1,
    textAlign: 'right',
    fontSize: 15,
    paddingTop: 5,
  },
});
