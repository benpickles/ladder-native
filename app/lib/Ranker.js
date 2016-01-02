export default function(players) {
  let lastRank = null
  let lastScore = null

  return players
    .sort(function(a, b) {
      return a.score < b.score ? 1 : -1
    })
    .map(function(attributes, index) {
      const score = attributes.score
      let rank

      if (score == lastScore) {
        rank = lastRank
      } else {
        rank = index
        lastRank = rank
      }

      attributes.rank = rank + 1

      lastScore = score

      return attributes
    })
}
