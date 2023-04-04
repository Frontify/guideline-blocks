/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import React, { useState } from 'react';
import { PageLinks } from './PageLinks';
import { IconColorFan16, merge } from '@frontify/fondue';

type DocumentLinkProps = {
    document: {
        id: number;
        title: string;
        permanentLink: string;
    };
    appBridge: AppBridgeBlock;
    onSelectUrl: (url: string) => void;
};

export const itemClassNames =
    'tw-text-text hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover focus-visible:tw-ring-4 focus-visible:tw-ring-blue focus-visible:tw-ring-offset-2 focus-visible:dark:tw-ring-offset-black focus-visible:tw-outline-none tw-leading-5 tw-no-underline';

export const DocumentLink = ({ document, appBridge, onSelectUrl }: DocumentLinkProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div
                className={merge(['tw-py-2 tw-px-2.5', itemClassNames])}
                onClick={() => onSelectUrl(document.permanentLink)}
            >
                <div key={document.id} className="tw-flex tw-flex-1 tw-space-x-1 tw-items-center tw-h-6">
                    <button
                        data-test-id="tree-item-toggle"
                        className="tw-flex tw-items-center tw-justify-center tw-p-1.5 tw-cursor-pointer"
                        tabIndex={0}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div
                            className={merge([
                                'tw-transition-transform tw-w-0 tw-h-0 tw-text-text-weak tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                                isExpanded ? 'tw-rotate-90' : '',
                            ])}
                        ></div>
                    </button>
                    <span className="tw-text-text-weak">
                        <IconColorFan16 />
                    </span>
                    <span className="tw-text-s">{document.title}</span>
                    <span className="tw-flex-auto tw-font-sans tw-text-xs tw-text-right tw-text-text-weak">
                        Document
                    </span>
                </div>
            </div>
            {isExpanded && <PageLinks appBridge={appBridge} documentId={document.id} />}
        </>
    );
};
