/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useDocumentSection } from '@frontify/app-bridge';
import React, { ReactElement } from 'react';
import { SectionLink } from './SectionLink';

type PageLinksProps = {
    appBridge: AppBridgeBlock;
    pageId: number;
};

export const SectionLinks = ({ appBridge, pageId }: PageLinksProps): ReactElement => {
    const { documentSections } = useDocumentSection(appBridge, pageId);
    const sectionsArray = [...documentSections.values()];

    return (
        <>
            {sectionsArray.map((section) => {
                return <SectionLink key={section.id} section={section} />;
            })}
        </>
    );
};
