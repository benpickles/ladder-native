import Api from './Api'

export default {
  createResult(winnerId, loserId) {
    return Api.createResult({
      data: {
        relationships: {
          loser: {
            data: {
              id: loserId,
            },
          },
          winner: {
            data: {
              id: winnerId,
            },
          },
        },
      },
    })
  },

  players() {
    return Api.players().then(function(body) {
      return body.data.map(function(player) {
        let attributes = player.attributes
        attributes.id = player.id
        return attributes
      })
    })
  },

  playersByName() {
    return this.players().then(function(players) {
      return players.sort(function(a, b) {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      })
    })
  },

  playersByPosition() {
    return this.players().then(function(players) {
      const sorted = players.sort(function(a, b) {
        return a.score < b.score ? 1 : -1
      })

      let lastScore = null
      let position = 0

      sorted.forEach(function(attributes) {
        if (lastScore != attributes.score) position++
        attributes.position = position
        lastScore = attributes.score
      })

      return sorted
    })
  },

  results() {
    return Api.results().then(function(body) {
      const players = body.included.reduce(function(memo, player) {
        memo[player.id] = player.attributes
        return memo
      }, {})

      return body.data.map(function(result) {
        const winnerId = result.relationships.winner.data.id
        const loserId = result.relationships.loser.data.id

        return {
          loser: players[loserId].name,
          transfer: result.attributes.transfer,
          winner: players[winnerId].name,
        }
      })
    })
  },
}
