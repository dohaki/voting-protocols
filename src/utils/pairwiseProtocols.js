export const getPairwiseWinsOfCandidate = (candidate, votes) => {
  return votes.reduce((result, vote) => {
    const scoreMapOfVote = getScoreMapOfCandidateInVote(candidate, vote)
    Object.keys(scoreMapOfVote).forEach(opponent => {
      if (result[opponent]) {
        result[opponent] += scoreMapOfVote[opponent]
      } else {
        result[opponent] = scoreMapOfVote[opponent]
      }
    })
    return result
  }, {})
}

export const getScoreMapOfCandidateInVote = (candidate, vote) => {
  const candidatePosition = vote.indexOf(candidate)
  return vote.reduce((scoreMap, opponent) => {
    const opponentPosition = vote.indexOf(opponent)
    if (candidatePosition !== opponentPosition) {
      scoreMap[opponent] = candidatePosition > opponentPosition ? 1 : 0
    }
    return scoreMap
  }, {})
}