///////////////
// Mock Data //
///////////////

const ALICE = 'Alice'
const BOB = 'Bob'
const CHARLIE = 'Charlie'
const DAVE = 'Dave'

export const SCORING_PROTOCOL_CANDIDATES = [
  ALICE,
  BOB,
  CHARLIE,
  DAVE
]

export const SCORING_PROTOCOL_VOTES = [
  // A > B > C > D
  [ALICE, BOB, CHARLIE, DAVE],
  // B > A > D > C
  [BOB, ALICE, DAVE, CHARLIE],
  // D > A > B > C
  [DAVE, ALICE, BOB, CHARLIE],
]