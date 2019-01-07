import React, { Component } from 'react';
import { Grommet, Box, DataTable, Text } from 'grommet';
import { grommet } from 'grommet/themes';

import * as scoringProtocolsUtils from './utils/scoringProtocols';

import { SCORING_PROTOCOL_CANDIDATES, SCORING_PROTOCOL_VOTES } from './utils/data'

const columns = [
  {
    property: 'candidate',
    header: 'Candidate',
    primary: true
  },
  {
    property: 'pluralityScore',
    header: 'Plurality',
    align: 'center'
  },
  {
    property: 'vetoScore',
    header: 'Veto',
    align: 'center'
  },
  {
    property: 'kApprovalScore',
    header: 'k-Approval',
    align: 'center'
  },
  {
    property: 'bordaScore',
    header: 'Borda',
    align: 'center'
  }
]

class App extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    const allScoringProtocolScores = scoringProtocolsUtils.getAllScores(
      SCORING_PROTOCOL_CANDIDATES,
      SCORING_PROTOCOL_VOTES
    )
    this.setState({ data: allScoringProtocolScores })
  }

  render() {
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <Box pad={{ vertical: 'large' }}>
            {
              SCORING_PROTOCOL_VOTES.map((vote, i) => (
                <Box direction="row" key={i}>
                  <Text weight="bold">Vote {i + 1}:&nbsp;</Text>
                  {
                    vote.map((candidateInVote, j) => (
                      <Text key={j}>
                        {j !== 0 && '>'}&nbsp;{candidateInVote}&nbsp;
                      </Text>
                    ))
                  }
                </Box>
              ))
            }
          </Box>
          <DataTable columns={columns} data={this.state.data} />
        </Box>
      </Grommet>
    );
  }
}

export default App;
