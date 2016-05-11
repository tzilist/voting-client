import React from 'react';
import Winner from './Winner';
import Vote from './Vote';

const Voting = (props) => (
  <div>
    {props.winner ?
      <Winner winner={props.winner} /> :
      <Vote {...props} />
    }
  </div>
);

Voting.propTypes = {
  winner: React.PropTypes.string,
};

export default Voting;
