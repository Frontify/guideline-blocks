/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { merge } from '@frontify/fondue';
import React from 'react';
import { itemClassNames } from './DocumentLink';

type DocumentLinkProps = {
    page: {
        id: number;
        title: string;
    };
    appBridge: AppBridgeBlock;
};

export const PageLink = ({ page }: DocumentLinkProps) => {
    // const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div className={merge(['tw-py-2 tw-px-2.5 tw-pl-7', itemClassNames])}>
                <div key={page.id} className="tw-flex tw-flex-1 tw-space-x-1 tw-items-center tw-h-6">
                    {/* <button
                        data-test-id="tree-item-toggle"
                        className="tw-flex tw-items-center tw-justify-center tw-p-1.5 tw-cursor-pointer"
                        tabIndex={0}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div
                            className={merge([
                                'tw-transition-transform tw-w-0 tw-h-0 tw-border-black-30 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                                isExpanded ? 'tw-rotate-90' : '',
                            ])}
                        ></div>
                    </button> */}
                    <span className="tw-text-s">{page.title}</span>
                    <span className="tw-flex-auto tw-font-sans tw-text-xs tw-text-right tw-text-text-weak">Page</span>
                </div>
            </div>
            {/* {isExpanded && <SectionLinks appBridge={appBridge} pageId={page.id} />} */}
        </>
    );
};
