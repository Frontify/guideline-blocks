/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@frontify/fondue';
import React from 'react';

type SectionLinkProps = {
    section: {
        id: number;
        title: string;
    };
};

export const SectionLink = ({ section }: SectionLinkProps) => {
    return (
        <>
            <div className={merge(['tw-py-2 tw-px-2.5 tw-pl-7'])}>
                <div key={section.id} className="tw-flex tw-flex-1 tw-space-x-1 tw-items-center tw-h-6">
                    <span>{section.title}</span>
                    <span className="tw-flex-auto tw-font-sans tw-text-xs tw-text-right tw-text-text-white">
                        Section
                    </span>
                </div>
            </div>
        </>
    );
};
