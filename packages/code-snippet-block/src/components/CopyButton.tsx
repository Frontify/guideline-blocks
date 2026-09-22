/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip } from '@frontify/fondue/components';
import { IconCheckMark, IconClipboard } from '@frontify/fondue/icons';
import { useCopy } from '@frontify/guideline-blocks-shared';
import { type CSSProperties, type FC, useState } from 'react';

type CopyButtonProps = {
    content: string;
    className?: string;
    style?: CSSProperties;
    withTooltip?: boolean;
    testId?: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content, className, style, withTooltip = false, testId }) => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const { copy, status } = useCopy();
    const isCopied = status === 'success';

    const handleCopy = async () => {
        await copy(content);

        if (withTooltip) {
            setIsTooltipOpen(true);
        }
    };

    if (withTooltip) {
        const label = isCopied ? 'Copied' : 'Copy to clipboard';

        return (
            <Tooltip.Root open={isTooltipOpen} onOpenChange={setIsTooltipOpen} enterDelay={0}>
                <Tooltip.Trigger asChild>
                    <button
                        type="button"
                        data-test-id={testId}
                        className={className}
                        style={style}
                        onClick={handleCopy}
                        aria-label={label}
                    >
                        {isCopied ? <IconCheckMark /> : <IconClipboard />}
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Content>{label}</Tooltip.Content>
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
