/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SandpackPreview } from '@codesandbox/sandpack-react';
import { FOCUS_VISIBLE_STYLE } from '@frontify/fondue';
import { Button } from '@frontify/fondue/components';
import { IconCross } from '@frontify/fondue/icons';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { Fragment, type ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
    onClose: () => void;
}

const devices = [
    { label: 'Desktop', width: 1440 },
    { label: 'Tablet', width: 834 },
    { label: 'Mobile', width: 390 },
];

export const ResponsivePreview = ({ onClose }: Props): ReactElement => {
    const [width, setWidth] = useState(1440);
    const [activeElementOnMount] = useState<HTMLElement>(document.activeElement as HTMLElement);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const onPreviewClose = useCallback(() => {
        // Move the tab index back to where it was before modal open
        activeElementOnMount?.focus();
        onClose();
    }, [onClose, activeElementOnMount]);

    useEffect(() => {
        buttonRef.current?.focus();
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onPreviewClose();
            } else if (e.key === 'Tab') {
                const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
                const modal = modalRef.current as HTMLDivElement;
                const focusableContent = modal.querySelectorAll(focusableElements);
                const firstFocusableElement = focusableContent[0] as HTMLButtonElement;
                const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLButtonElement;

                if (!e.shiftKey && e.target === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }

                if (e.shiftKey && e.target === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            }
        };
        window.addEventListener('keydown', keyHandler);
        return () => window.removeEventListener('keydown', keyHandler);
    }, [onPreviewClose]);

    return createPortal(
        <div ref={modalRef} data-test-id="ui-pattern-responsive-preview" className="ui-pattern-block">
            <div className="tw-fixed tw-z-[5000] tw-box-border tw-w-full tw-h-full tw-top-0 tw-left-0 tw-p-6 tw-pb-12">
                <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-8 tw-items-center">
                    <button
                        type="button"
                        onClick={onPreviewClose}
                        className="tw-w-full tw-h-full tw-bg-black tw-opacity-90 tw-absolute tw-top-0 tw-left-0"
                    />
                    <div className="tw-flex tw-justify-center tw-w-full tw-relative">
                        <div className=" tw-bg-white tw-h-10 tw-p-0.5 tw-rounded tw-flex tw-gap-0.5">
                            {devices.map((device, i) => (
                                <Fragment key={device.label}>
                                    <button
                                        type="button"
                                        data-test-id="ui-pattern-responsive-preview-device-button"
                                        onClick={() => setWidth(device.width)}
                                        key={device.label}
                                        className={joinClassNames([
                                            'tw-h-full tw-text-button-text tw-rounded tw-px-2 tw-border hover:tw-bg-button-background-hover active:tw-bg-button-background-pressed',
                                            FOCUS_VISIBLE_STYLE,
                                            width === device.width
                                                ? 'tw-border-button-border tw-bg-button-background-pressed hover:tw-bg-button-background-pressed'
                                                : 'tw-border-transparent',
                                        ])}
                                    >
                                        {device.label}
                                    </button>
                                    {i !== devices.length - 1 && <div className="tw-bg-line tw-w-[1px] tw-h-full" />}
                                </Fragment>
                            ))}
                        </div>
                        <div className="tw-absolute tw-right-0">
                            <Button
                                aria-label="Close responsive preview view"
                                ref={buttonRef}
                                data-test-id="ui-pattern-responsive-preview-close-btn"
                                onPress={onPreviewClose}
                                emphasis="default"
                                aspect="square"
                            >
                                <IconCross size="20" />
                            </Button>
                        </div>
                    </div>
                    <div className="tw-max-w-[90vw] tw-relative tw-h-full tw-overflow-auto">
                        <div
                            data-test-id="ui-pattern-responsive-preview-device"
                            style={{
                                width,
                            }}
                            className="tw-h-full"
                        >
                            <SandpackPreview
                                showOpenInCodeSandbox={false}
                                showRestartButton={false}
                                showRefreshButton={false}
                                className="tw-w-full tw-h-full tw-rounded tw-overflow-hidden tw-bg-white tw-bg-none "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
