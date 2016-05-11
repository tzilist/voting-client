import React from 'react';

const Winner = (props) => (
  <div className="winner">
    Winner is {props.winner}!
  </div>
);


Winner.propTypes = {
  winner: React.PropTypes.string,
};

export default Winner;
