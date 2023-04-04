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
    selectedUrl: string;
    onSelectUrl: (url: string) => void;
};

export const DocumentLink = ({ document, appBridge, selectedUrl, onSelectUrl }: DocumentLinkProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isActive = document.permanentLink === selectedUrl;

    return (
        <>
            <div
                className={merge([
                    'tw-py-2 tw-px-2.5 tw-leading-5 tw-cursor-pointer',
                    isActive
                        ? 'tw-bg-box-selected-strong tw-text-box-selected-strong-inverse hover:tw-bg-box-selected-strong-hover:hover hover:tw-text-box-selected-strong-inverse-hover:hover'
                        : 'hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover',
                ])}
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
                                'tw-transition-transform tw-w-0 tw-h-0 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                                isExpanded ? 'tw-rotate-90' : '',
                            ])}
                        ></div>
                    </button>
                    <IconColorFan16 />
                    <span className="tw-text-s">{document.title}</span>
                    <span className="tw-flex-auto tw-font-sans tw-text-xs tw-text-right">Document</span>
                </div>
            </div>
            {isExpanded && (
                <PageLinks
                    appBridge={appBridge}
                    documentId={document.id}
                    selectedUrl={selectedUrl}
                    onSelectUrl={onSelectUrl}
                />
            )}
        </>
    );
};
