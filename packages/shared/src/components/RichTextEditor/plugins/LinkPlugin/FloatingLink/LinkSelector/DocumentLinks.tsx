/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useDocuments } from '@frontify/app-bridge';
import React, { ReactElement } from 'react';
import { DocumentLink } from './DocumentLink';

type DocumentLinksProps = {
    appBridge: AppBridgeBlock;
    selectedUrl: string;
    onSelectUrl: (url: string) => void;
};

export const DocumentLinks = ({ appBridge, selectedUrl, onSelectUrl }: DocumentLinksProps): ReactElement => {
    const { documents } = useDocuments(appBridge);
    const documentArray = [...documents.values()];

    return (
        <>
            {documentArray.map((document) => {
                return (
                    <DocumentLink
                        key={document.id}
                        document={document}
                        appBridge={appBridge}
                        selectedUrl={selectedUrl}
                        onSelectUrl={onSelectUrl}
                    />
                );
            })}
        </>
    );
};
