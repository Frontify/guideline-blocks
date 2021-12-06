/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { SettingsContext } from '../SettingsContext';
import { CheckboxProps, DefaultValues } from '../types';
import { Checkbox } from './Checkbox';

const CheckboxBlockSelector = '[data-test-id="checkbox"]';

const CheckboxWithContext = (props: CheckboxProps) => {
    return (
        <SettingsContext.Provider value={DefaultValues}>
            <Checkbox {...props} />
        </SettingsContext.Provider>
    );
};

it('renders a checkbox', () => {
    mount(<CheckboxWithContext id={'1'} checked={false} showLabel={false} label={'Test'} />);
    cy.get(CheckboxBlockSelector).should('exist');
});
