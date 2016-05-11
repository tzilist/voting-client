import React from 'react';

export default class Voting extends React.Component {
  getPair() {
    return this.props.pair || [];
  }

  hasVotedFor(entry) {
    return this.props.hasVoted === entry;
  }

  isDisabled() {
    return !!this.props.hasVoted;
  }

  render() {
    return (
      <div className="voting">
        {this.getPair().map(entry =>
          <button
            key={entry}
            disabled={this.isDisabled()}
            onClick={() => this.props.vote(entry)}
          >
            <h1>{entry}</h1>
            {this.hasVotedFor(entry) ?
              <div className="voted">Voted</div> :
              null}
          </button>
        )}
      </div>
    );
  }
}

Voting.propTypes = {
  pair: React.PropTypes.array,
  hasVoted: React.PropTypes.string,
  winner: React.PropTypes.string,
};
