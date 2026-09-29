/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown } from '@frontify/fondue/icons';
import { type PropsWithChildren, type ReactElement } from 'react';

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
                type="button"
                aria-expanded={isOpen}
                className={`tw-relative focus:tw-z-20 tw-body-small tw-gap-2 tw-w-[calc(100%-32px)] tw-text-secondary tw-box-content tw-bg-white tw-h-10 tw-px-4 tw-flex tw-items-center focus-visible:tw-ring-4 focus-visible:tw-ring-blue focus-visible:tw-ring-offset-2 focus-visible:dark:tw-ring-offset-black focus-visible:tw-outline-none tw-ring-inset ${isOpen ? 'tw-border-b tw-border-b-line' : ''}`}
                style={{
                    borderBottomLeftRadius: !isOpen ? borderRadius : undefined,
                    borderBottomRightRadius: !isOpen ? borderRadius : undefined,
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {label}
                <div className={isOpen ? 'tw-rotate-180' : undefined}>
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
