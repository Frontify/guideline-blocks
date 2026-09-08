/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip } from '@frontify/fondue/components';
import { IconCheckMark, IconClipboard } from '@frontify/fondue/icons';
import { useCopy } from '@frontify/guideline-blocks-shared';
import { type CSSProperties, type FC, useEffect, useState } from 'react';

type CopyButtonProps = {
    content: string;
    className?: string;
    style?: CSSProperties;
    /** Renders an icon-only button wrapped in a tooltip instead of an icon with a visible label. */
    withTooltip?: boolean;
    testId?: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content, className, style, withTooltip = false, testId }) => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const { copy, status } = useCopy();
    const isCopied = status === 'success';

    useEffect(() => {
        if (!isTooltipOpen) {
            return;
        }

        window.dispatchEvent(new Event('resize'));
    }, [isCopied, isTooltipOpen]);

    const handleCopy = async () => {
        await copy(content);
        setIsTooltipOpen(true);
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
