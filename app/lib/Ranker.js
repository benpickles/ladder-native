export default function(players) {
  let lastRank = null
  let lastScore = null

  return players
    .sort(function(a, b) {
      return a.get('score') < b.get('score') ? 1 : -1
    })
    .map(function(attributes, index) {
      const score = attributes.get('score')
      let rank

      if (score == lastScore) {
        rank = lastRank
      } else {
        rank = index
        lastRank = rank
      }

      lastScore = score

      return attributes.set('rank', rank + 1)
    })
}
