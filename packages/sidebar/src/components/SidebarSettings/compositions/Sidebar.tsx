/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useContext } from 'react';
import {
    Accordion,
    AccordionItem,
    Breadcrumb,
    Breadcrumbs,
    Button,
    ButtonStyle,
    FieldsetHeaderType,
    IconReject,
} from '@frontify/arcade';
import { getSubSections, hasAtLeastOneSection } from '../helpers/sections';
import { SettingsContext } from '../hocs/withSettings';
import { Section } from './Section';
import { useCondition } from '../hooks/useCondition';

type SidebarProps = {
    breadcrumbs: Breadcrumb[];
};

export const Sidebar: FC<SidebarProps> = ({ breadcrumbs }) => {
    const { settings, pathMap, updateData, onClosed } = useContext(SettingsContext);
    const { main } = settings;
    const condition = useCondition(settings, pathMap, updateData);
    const sidebarSections = getSubSections(settings, condition);

    return (
        <>
            {main && (
                <>
                    <div className="tw-flex tw-flex-grow tw-p-4">
                        <div className="tw-flex-grow tw-pt-3 tw-pl-4">
                            <Breadcrumbs items={breadcrumbs} />
                        </div>
                        <div className="tw-pt-1 tw-pr-2" data-test-id="settings-sidebar-close">
                            <Button
                                onClick={onClosed}
                                style={ButtonStyle.Secondary}
                                solid={false}
                                icon={<IconReject />}
                            ></Button>
                        </div>
                    </div>
                    <div className="tw-pt-0 tw-px-8 tw-pb-8">{main.length > 0 && <Section blocks={main} />}</div>
                </>
            )}

            {hasAtLeastOneSection(sidebarSections) && (
                <Accordion>
                    {sidebarSections.map((sidebarSection) => (
                        <AccordionItem
                            key={sidebarSection.title}
                            header={{
                                children: sidebarSection.title,
                                type: FieldsetHeaderType.Accordion,
                            }}
                        >
                            <Section blocks={sidebarSection.blocks} />
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </>
    );
};
