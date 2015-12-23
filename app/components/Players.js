import React from 'react-native'

const {
  ListView,
  StyleSheet,
  Text,
  View,
} = React

import Loading from './Loading'
import PlayersActions from '../actions/PlayersActions'

export default class extends React.Component {
  constructor() {
    super()

    this._dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
  }

  componentDidMount() {
    PlayersActions.fetch()
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.players.equals(this.props.players)
  }

  render() {
    const { players } = this.props

    if (players.isEmpty()) return <Loading />

    const dataSource = this._dataSource.cloneWithRows(players.toJS())

    return (
      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow}
        style={style.list}
      />
    )
  }

  renderRow(row) {
    return (
      <View style={style.row}>
        <Text style={style.position}>{row.position}</Text>
        <Text style={style.name}>{row.name}</Text>
        <Text style={style.score}>{row.score}</Text>
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
