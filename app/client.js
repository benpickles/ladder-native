const API = 'http://staging-ladder-api.herokuapp.com'

export default {
  createResult(winnerId, loserId) {
    const body = JSON.stringify({
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

    return fetch(`${API}/results`, {
      body: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
    })
  },

  players() {
    return fetch(`${API}/players`)
      .then((response) => response.json())
  },

  results() {
    return fetch(`${API}/results`)
      .then((response) => response.json())
  }
}
