/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FOCUS_VISIBLE_STYLE_INSET } from '@frontify/fondue';
import { IconCaretDown } from '@frontify/fondue/icons';

import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { PropsWithChildren, ReactElement } from 'react';

interface Props {
    label: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    borderRadius?: number;
}

export const Accordion = ({
    label,
    children,
    isOpen,
    setIsOpen,
    borderRadius,
}: PropsWithChildren<Props>): ReactElement => {
    return (
        <div
            data-test-id="dependency-accordion"
            className="tw-border-b tw-border-b-line group-[.bordered]:last:tw-border-b-0"
        >
            <button
                aria-expanded={isOpen}
                className={joinClassNames([
                    'tw-relative focus:tw-z-20 tw-text-s tw-gap-2 tw-w-[calc(100%-32px)] tw-text-text-weak tw-box-content tw-bg-white tw-h-10 tw-px-4 tw-flex tw-items-center',
                    isOpen && 'tw-border-b tw-border-b-line',
                    FOCUS_VISIBLE_STYLE_INSET,
                ])}
                style={{
                    borderBottomLeftRadius: !isOpen ? borderRadius : undefined,
                    borderBottomRightRadius: !isOpen ? borderRadius : undefined,
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {label}
                <div className={joinClassNames([isOpen ? 'tw-rotate-180' : ''])}>
                    <IconCaretDown size={12} />
                </div>
            </button>
            {isOpen && (
                <div
                    style={{
                        borderBottomLeftRadius: borderRadius,
                        borderBottomRightRadius: borderRadius,
                    }}
                    data-test-id="dependency-accordion-children"
                    className="tw-overflow-hidden"
                >
                    {children}
                </div>
            )}
        </div>
    );
};
