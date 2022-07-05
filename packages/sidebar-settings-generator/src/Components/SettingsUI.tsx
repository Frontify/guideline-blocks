/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Accordion, AccordionItem, FieldsetHeaderType } from '@frontify/fondue';
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
        <>
            <div>
                {sections.length > 0 && (
                    <Accordion border>
                        {sections.map(([title, settings]) => (
                            <AccordionItem
                                divider
                                key={title}
                                header={{
                                    children: capitalize(title),
                                    type: FieldsetHeaderType.Accordion,
                                    active: true,
                                }}
                            >
                                <Section blocks={settings} />
                                <EmptySection
                                    onClick={() => setInsertSettingPosition({ path: title, arrayIndex: 0 })}
                                    text="Add a setting"
                                />
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
            <SettingsModal
                show={!!insertSettingPosition.path}
                onClose={() => setInsertSettingPosition(DEFAULT_INSERT_POSITION_STATE)}
                onUpdateSettings={handleAddNewSetting}
            />
        </>
    );
};
