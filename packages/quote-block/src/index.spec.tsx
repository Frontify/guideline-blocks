import { mount } from '@cypress/react';
import { withAppBridgeStubs } from '@frontify/guideline-blocks-shared';
import QuoteBlock from '.';

const QuoteBlockSelector = '[data-test-id="quote-block"]'

it('renders a quote block', () => {
    const [QuoteBlockWithStubs, appBridge] = withAppBridgeStubs(QuoteBlock, {});

    mount(<QuoteBlockWithStubs />);
    cy.get(QuoteBlockSelector).contains('Add your quote text here');
});
