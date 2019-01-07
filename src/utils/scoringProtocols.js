export const getAllScores = (candidates, votes, k = 2) => {
  const pluralityScores = getPluralityScores(candidates, votes)
  const vetoScores = getVetoScores(candidates, votes)
  const kApprovalScores = getKapprovalScores(candidates, votes, k)
  const bordaScores = getBordaScores(candidates, votes)
  return candidates.map(c => {
    return {
      candidate: c,
      pluralityScore: pluralityScores.find(({ candidate }) => candidate === c).score,
      vetoScore: vetoScores.find(({ candidate }) => candidate === c).score,
      kApprovalScore: kApprovalScores.find(({ candidate }) => candidate === c).score,
      bordaScore: bordaScores.find(({ candidate }) => candidate === c).score
    }
  })
}

/**
 * Calculates plurality scores of given candidates and votes.
 * @param {string[]} candidates - List of candidates represented by a string.
 * @param {string[string[]]} votes - List of votes where a vote is represented by an ordered list of candidates.
 */
export const getPluralityScores = (candidates, votes) => {
  const topCandidates = votes.map(vote => vote[0])
  return candidates.map(candidate => {
    const pluralityScore = topCandidates
      .reduce((accumulatedScore, topCandidate) => {
        if (topCandidate === candidate) {
          accumulatedScore++
        }
        return accumulatedScore
      }, 0)
    return {
      candidate,
      score: pluralityScore
    }
  })
}

export const getPluralityScoreMapOfVote = (candidates, vote) => {
  return candidates.reduce((pluralityScoreMap, candidateInVote) => {
    const positionOfCandidate = vote.indexOf(candidateInVote)
    pluralityScoreMap[candidateInVote] = positionOfCandidate === 0 ? 1 : 0
    return pluralityScoreMap
  })
}

export const getVetoScores = (candidates, votes) => {
  const lastCandidates = votes.map(vote => vote[candidates.length - 1])
  return candidates.map(candidate => {
    const vetoScore = lastCandidates
      .reduce((reducedScore, lastCandidate) => {
        if (lastCandidate === candidate) {
          reducedScore--
        }
        return reducedScore
      }, candidates.length)
    return {
      candidate,
      score: vetoScore
    }
  })
}

export const getKapprovalScores = (candidates, votes, k) => {
  const kCandidates = votes.map(vote => vote.slice(0, k)).flat()
  return candidates.map(candidate => {
    const kScore = kCandidates
      .reduce((accumulatedScore, kCandidate) => {
        if (kCandidate === candidate) {
          accumulatedScore++
        }
        return accumulatedScore
      }, 0)
    return {
      candidate,
      score: kScore
    }
  })
}

export const getBordaScores = (candidates, votes) => {
  const bordaScoreMaps = votes.map(vote => getBordaScoreMapOfVote(candidates, vote))
  return candidates.map(candidate => {
    const totalBordaScore = bordaScoreMaps
      .reduce((bordaScoreSum, bordaScoreMap) => {
        return bordaScoreSum + bordaScoreMap[candidate]
      }, 0)
    return {
      candidate,
      score: totalBordaScore
    }
  })
}

const getBordaScoreMapOfVote = (candidates, vote) => {
  return vote.reduce((bordaMap, candidateInVote, i) => {
    bordaMap[candidateInVote] = candidates.length - (i + 1)
    return bordaMap
  }, {})
}
