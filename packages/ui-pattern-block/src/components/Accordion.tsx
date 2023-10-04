/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown12 } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { PropsWithChildren, ReactElement } from 'react';

interface Props {
    label: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const Accordion = ({ label, children, isOpen, setIsOpen }: PropsWithChildren<Props>): ReactElement => {
    return (
        <div data-test-id="dependency-accordion" className="tw-border-b tw-border-b-line last:tw-border-b-0">
            <button
                className={joinClassNames([
                    'tw-text-s tw-gap-2 tw-w-full tw-text-text-weak tw-box-content tw-bg-white tw-h-10 tw-px-4 tw-flex tw-items-center',
                    isOpen && 'tw-border-b tw-border-b-line',
                ])}
                onClick={() => setIsOpen(!isOpen)}
            >
                {label}
                <div className={joinClassNames([isOpen ? 'tw-rotate-180' : ''])}>
                    <IconCaretDown12 />
                </div>
            </button>
            {isOpen && <div data-test-id="dependency-accordion-children">{children}</div>}
        </div>
    );
};
