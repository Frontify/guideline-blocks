/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import React, { useState } from 'react';
import { PageLinks } from './PageLinks';

type DocumentLinkProps = {
    document: {
        id: number;
        title: string;
    };
    appBridge: AppBridgeBlock;
};

export const DocumentLink = ({ document, appBridge }: DocumentLinkProps) => {
    const [expended, setExpended] = useState(false);

    return (
        <>
            <div key={document.id} className="tw-flex tw-flex-1 tw-space-x-1 tw-items-center tw-h-6">
                <button
                    data-test-id="tree-item-toggle"
                    className="tw-flex tw-items-center tw-justify-center tw-p-1.5 tw-cursor-pointer"
                    tabIndex={0}
                    onClick={() => setExpended(!expended)}
                >
                    <div className="tw-transition-transform tw-w-0 tw-h-0 tw-text-black-100 tw-text-opacity-40 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong"></div>
                </button>
                {document.title}
            </div>
            {expended && <PageLinks appBridge={appBridge} documentId={document.id} />}
        </>
    );
};
