/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useDocumentSection } from '@frontify/app-bridge';
import { merge } from '@frontify/fondue';
import React, { useEffect, useState } from 'react';
import { SectionLink } from './SectionLink';
import { InitiallyExpandedItems } from './types';

type DocumentLinkProps = {
    page: {
        id: number;
        title: string;
        permanentLink: string;
    };
    selectedUrl: string;
    onSelectUrl: (url: string) => void;
    appBridge: AppBridgeBlock;
    itemsToExpandInitially: InitiallyExpandedItems;
};

export const PageLink = ({ page, selectedUrl, onSelectUrl, itemsToExpandInitially, appBridge }: DocumentLinkProps) => {
    const [isExpanded, setIsExpanded] = useState(page.id === itemsToExpandInitially.documentId);
    const isActive = page.permanentLink === selectedUrl;
    const { documentSections } = useDocumentSection(appBridge, page.id);
    const sectionsArray = [...documentSections.values()];
    const hasSections = sectionsArray.length > 0;

    useEffect(() => {
        if (page.id === itemsToExpandInitially.pageId) {
            setIsExpanded(true);
        }
    }, [itemsToExpandInitially, page.id]);

    return (
        <>
            <div
                role="button"
                tabIndex={0}
                data-test-id="internal-link-selector-page-link"
                className={merge([
                    'tw-py-2 tw-px-2.5 tw-leading-5 tw-cursor-pointer',
                    hasSections ? 'tw-pl-7' : 'tw-pl-12',
                    isActive
                        ? 'tw-bg-box-selected-strong tw-text-box-selected-strong-inverse hover:tw-bg-box-selected-strong-hover:hover hover:tw-text-box-selected-strong-inverse-hover:hover'
                        : 'hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover',
                ])}
                onKeyDown={(event) => event.key === 'Enter' && onSelectUrl(page.permanentLink)}
                onClick={() => onSelectUrl(page.permanentLink)}
                onFocus={() => onSelectUrl(page.permanentLink)}
            >
                <div key={page.id} className="tw-flex tw-flex-1 tw-space-x-1 tw-items-center tw-h-6">
                    {hasSections && (
                        <button
                            data-test-id="tree-item-toggle"
                            className="tw-flex tw-items-center tw-justify-center tw-p-1.5 tw-cursor-pointer"
                            onClick={() => setIsExpanded(!isExpanded)}
                            onFocus={() => setIsExpanded(!isExpanded)}
                        >
                            <div
                                className={merge([
                                    'tw-transition-transform tw-w-0 tw-h-0 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                                    isExpanded ? 'tw-rotate-90' : '',
                                ])}
                            ></div>
                        </button>
                    )}
                    <span className="tw-text-s">{page.title}</span>
                    <span className="tw-flex-auto tw-font-sans tw-text-xs tw-text-right">Page</span>
                </div>
            </div>
            {isExpanded &&
                sectionsArray.length > 0 &&
                sectionsArray.map((section) => {
                    return (
                        <SectionLink
                            key={section.id}
                            section={section}
                            selectedUrl={selectedUrl}
                            onSelectUrl={onSelectUrl}
                        />
                    );
                })}
        </>
    );
};
