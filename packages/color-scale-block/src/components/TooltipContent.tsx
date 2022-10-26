/* (c) Copyright Frontify Ltd., all rights reserved. */

export type TooltipContentProps = {
    colorValue: string;
    colorName: string;
    status: 'error' | 'success' | 'idle';
};

export const TooltipContent = ({ colorName, colorValue, status }: TooltipContentProps) => {
    return (
        <span data-test-id="tooltip-content">
            <span className="tw-block">{colorName}</span>
            <span className="tw-block">{colorValue}</span>
            <span className="tw-text-black-50">
                {status === 'error' && 'Error copying. Try again.'}
                {status === 'idle' && 'Click color to copy.'}
                {status === 'success' && 'Copied!'}
            </span>
        </span>
    );
};
