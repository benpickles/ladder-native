const API = 'http://staging-ladder-api.herokuapp.com'

export default {
  createResult(body) {
    return fetch(`${API}/results`, {
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
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
