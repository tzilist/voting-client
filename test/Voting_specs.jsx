/* eslint no-undef:0 no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate,
} from 'react-addons-test-utils';
import { List } from 'immutable';
import { expect } from 'chai';
import Vote from '../src/components/Vote';
import Voting from '../src/components/Voting';

describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const pair = ['Red', 'Blue'];
    const component = renderIntoDocument(
      <Vote pair={pair} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Red');
    expect(buttons[1].textContent).to.equal('Blue');
  });

  it('invokes callback when button is clicked', () => {
    let voteWith;
    const pair = ['Red', 'Blue'];
    const vote = (entry) => {
      voteWith = entry;
    };
    const component = renderIntoDocument(
      <Vote pair={pair} vote={vote} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(voteWith).to.equal('Red');
  });

  it('disables button once the user has voted', () => {
    const component = renderIntoDocument(
      <Vote
        pair={['Red', 'Blue']}
        hasVoted="Red"
      />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds label to the voted entry', () => {
    const component = renderIntoDocument(
      <Vote
        pair={['Red', 'Blue']}
        hasVoted="Red"
      />
      );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('renders only the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting
        winner="Red"
      />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Red');
  });

  it('renders as a pure component', () => {
    const pair = ['Red', 'Blue'];
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Vote
        pair={pair}
      />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Red');

    pair[0] = 'Yellow';
    component = ReactDOM.render(
      <Vote
        pair={pair}
      />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Red');
  });

  it('does update DOM when prop changes', () => {
    const pair = List.of('Red', 'Blue');
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Red');

    const newPair = pair.set(0, 'Yello');
    component = ReactDOM.render(
      <Voting pair={newPair} />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Yello');
  });
});
