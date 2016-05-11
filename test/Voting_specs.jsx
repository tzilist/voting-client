/* eslint no-undef:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate,
} from 'react-addons-test-utils';
import { expect } from 'chai';
import Voting from '../src/components/Voting';

describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const pair = ['Red', 'Blue'];
    const component = renderIntoDocument(
      <Voting pair={pair} />
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
      <Voting pair={pair} vote={vote} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(voteWith).to.equal('Red');
  });

  it('disables button once the user has voted', () => {
    const component = renderIntoDocument(
      <Voting
        pair={['Red', 'Blue']}
        hasVoted="Red"
      />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].hasAttribue('disabled')).to.equal(true);
    expect(buttons[1].hasAttribue('disabled')).to.equal(true);
  });
});
