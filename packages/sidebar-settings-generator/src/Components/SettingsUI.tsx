/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Accordion, AccordionItem, FieldsetHeaderType } from '@frontify/fondue';
import { BlockSettings } from '@frontify/guideline-blocks-settings';
import { useContext, useState } from 'react';
import { SettingsContext } from '../settingsContext';
import { AddSectionModal } from './AddSectionModal';
import { EmptySection } from './EmptySection';
import { Section } from './Section';

const SECTIONS = ['main', 'layout', 'content', 'style', 'security'];

export const SettingsUI = () => {
    const { settings, setSettings } = useContext(SettingsContext);
    const [sectionModalOpen, setSectionModalOpen] = useState(false);

    const sectionIds = Object.keys(settings ?? {});

    const mainSection = settings?.main;
    const otherSections = settings ? Object.entries(settings).filter(([key]) => key !== 'main') : [];

    const handleOpenSectionModal = () => setSectionModalOpen(true);

    const handleAddSection = (section: string) => {
        setSettings((settings) => {
            if (settings && settings[section as keyof BlockSettings]) {
                return settings;
            }
            return { ...settings, [section]: [] };
        });
    };

    return (
        <>
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
                <EmptySection onClick={handleOpenSectionModal} text="Add new section" />
            </div>
            <AddSectionModal
                isOpen={sectionModalOpen}
                onClose={() => setSectionModalOpen(false)}
                onAddSection={handleAddSection}
                sections={SECTIONS.filter((section) => !sectionIds.includes(section))}
            />
        </>
    );
};
