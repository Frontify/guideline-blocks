/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Accordion, AccordionItem, FieldsetHeaderType, Heading, Stack } from '@frontify/fondue';
import { BlockSettings, SettingBlock } from '@frontify/guideline-blocks-settings';
import { capitalize, get, set } from 'lodash-es';
import { useContext, useState } from 'react';
import { SettingsContext } from '../settingsContext';
import { AddSectionModal } from './AddSectionModal';
import { EmptySection } from './EmptySection';
import { Section } from './Section';
import { SettingsModal } from './SettingsModal';

const SECTIONS = ['main', 'layout', 'content', 'style', 'security'];
const DEFAULT_INSERT_POSITION_STATE = { path: undefined, setting: undefined };

export const SettingsUI = () => {
    const { settings, setSettings } = useContext(SettingsContext);
    const [sectionModalOpen, setSectionModalOpen] = useState(false);
    const [insertSettingPosition, setInsertSettingPosition] = useState<{ path?: string; arrayIndex?: number }>(
        DEFAULT_INSERT_POSITION_STATE
    );

    const sectionIds = Object.keys(settings ?? {});

    const sections = settings ? Object.entries(settings) : [];

    const handleOpenSectionModal = () => setSectionModalOpen(true);

    const handleAddSection = (section: string) => {
        setSettings((settings) => {
            if (settings && settings[section as keyof BlockSettings]) {
                return settings;
            }
            return { ...settings, [section]: [] };
        });
        setSectionModalOpen(false);
    };

    const handleAddNewSetting = (setting: SettingBlock) => {
        setSettings((settings) => {
            if (!insertSettingPosition.path || insertSettingPosition.arrayIndex === undefined) {
                return settings;
            }
            const newSettings = { ...settings };
            const array = [...get(newSettings, insertSettingPosition.path)];
            array.splice(insertSettingPosition?.arrayIndex, 0, setting);
            set(newSettings, insertSettingPosition.path, array);

            return newSettings;
        });

        setInsertSettingPosition(DEFAULT_INSERT_POSITION_STATE);
    };

    return (
        <Stack padding="m" spacing="l" direction="column">
            <Heading size="xx-large">Create Your Sidebar</Heading>
            {sections.length > 0 && (
                <Accordion border>
                    {sections.map(([id, settings]) => (
                        <AccordionItem
                            divider
                            key={id}
                            header={{
                                children: capitalize(id),
                                type: FieldsetHeaderType.Accordion,
                                active: true,
                            }}
                        >
                            <div className="tw-pt-6">
                                <Section blocks={settings} />
                                <EmptySection
                                    onClick={() => setInsertSettingPosition({ path: id, arrayIndex: 0 })}
                                    text="Add a setting"
                                />
                            </div>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
            <EmptySection onClick={handleOpenSectionModal} text="Add new section" />
            <AddSectionModal
                isOpen={sectionModalOpen}
                onClose={() => setSectionModalOpen(false)}
                onAddSection={handleAddSection}
                sections={SECTIONS.filter((section) => !sectionIds.includes(section))}
            />
            <SettingsModal
                show={!!insertSettingPosition.path}
                onClose={() => setInsertSettingPosition(DEFAULT_INSERT_POSITION_STATE)}
                onUpdateSettings={handleAddNewSetting}
            />
        </Stack>
    );
};
