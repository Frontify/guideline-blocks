/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Accordion, AccordionItem, FieldsetHeaderType } from '@frontify/fondue';
import { useContext } from 'react';
import { SettingsContext } from '../settingsContext';
import { Section } from './Section';

export const SettingsUI = () => {
    const { settings } = useContext(SettingsContext);

    const mainSection = settings?.main;
    const otherSections = settings ? Object.entries(settings).filter(([key]) => key !== 'main') : [];

    return (
        <div>
            {mainSection && <Section blocks={mainSection} />}
            {otherSections.length > 0 && (
                <Accordion>
                    {otherSections.map(([title, settings]) => (
                        <AccordionItem
                            key={title}
                            header={{
                                children: title,
                                type: FieldsetHeaderType.Accordion,
                                active: true,
                            }}
                        >
                            <Section blocks={settings} />
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </div>
    );
};
