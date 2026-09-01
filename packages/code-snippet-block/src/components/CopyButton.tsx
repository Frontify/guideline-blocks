/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip } from '@frontify/fondue/components';
import { IconCheckMark, IconClipboard } from '@frontify/fondue/icons';
import debounce from 'lodash-es/debounce';
import { type CSSProperties, type FC, useState } from 'react';

const COPIED_STATE_DURATION = 2000;

type CopyButtonProps = {
    content: string;
    className?: string;
    style?: CSSProperties;
    /** Renders an icon-only button wrapped in a tooltip instead of an icon with a visible label. */
    withTooltip?: boolean;
    testId?: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content, className, style, withTooltip = false, testId }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
        setIsCopied(true);
        setIsTooltipOpen(true);
        window.dispatchEvent(new Event('resize')); // trigger resize event to update alignment of the tooltip
        debounce(() => {
            setIsCopied(false);
            window.dispatchEvent(new Event('resize'));
        }, COPIED_STATE_DURATION)();
    };

    if (withTooltip) {
        return (
            <Tooltip.Root open={isTooltipOpen} onOpenChange={setIsTooltipOpen} enterDelay={0}>
                <Tooltip.Trigger>
                    <button
                        type="button"
                        data-test-id={testId}
                        className={className}
                        style={style}
                        onClick={handleCopy}
                    >
                        {isCopied ? <IconCheckMark /> : <IconClipboard />}
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Content>{isCopied ? 'Copied' : 'Copy to clipboard'}</Tooltip.Content>
            </Tooltip.Root>
        );
    }

    return (
        <button
            type="button"
            data-test-id={testId}
            className={className}
            style={style}
            onClick={handleCopy}
            aria-live="assertive"
        >
            {isCopied ? (
                <>
                    <IconCheckMark size={16} /> Copied
                </>
            ) : (
                <>
                    <IconClipboard size={16} /> Copy
                </>
            )}
        </button>
    );
};
