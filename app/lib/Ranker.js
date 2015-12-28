export default function(players) {
  let lastScore = null
  let position = 0

  return players
    .sort(function(a, b) {
      return a.get('score') < b.get('score') ? 1 : -1
    })
    .map(function(attributes) {
      const score = attributes.get('score')
      if (lastScore != score) position++
      lastScore = score
      return attributes.set('position', position)
    })
}
