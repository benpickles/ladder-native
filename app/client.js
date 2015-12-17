const API = 'http://ladder-api.herokuapp.com'

export default {
  players() {
    return fetch(`${API}/players`)
      .then((response) => response.json())
  },

  results() {
    return fetch(`${API}/results`)
      .then((response) => response.json())
  }
}
