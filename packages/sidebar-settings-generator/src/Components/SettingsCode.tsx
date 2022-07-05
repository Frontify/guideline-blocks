/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconClipboard, IconCrossCircle, useCopy } from '@frontify/fondue';
import { BlockSettings } from '@frontify/guideline-blocks-settings';

const prettyPrint = (json: BlockSettings): string => {
    return JSON.stringify(json, undefined, 2);
};

export const SettingsCode = ({ settings }: { settings: BlockSettings }) => {
    const { copy, status } = useCopy();

    return (
        <>
            {(settings && (
                <>
                    <span className="tw-float-right tw-p-3">
                        <button
                            className={
                                'tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded tw-text-black-60 hover:tw-text-black-100'
                            }
                            onClick={() => copy(prettyPrint(settings ?? ''))}
                            title="Copy Code"
                            type="button"
                        >
                            {status === 'error' && (
                                <span className="tw-text-box-negative-strong">
                                    <IconCrossCircle />
                                </span>
                            )}
                            {status === 'idle' && <IconClipboard />}
                            {status === 'success' && (
                                <span className="tw-text-box-positive-strong tw-flex tw-items-center tw-justify-center">
                                    <IconCheckMark />
                                    <span className="tw-pl-2">Now pay 5$</span>
                                </span>
                            )}
                        </button>
                    </span>
                    <div className="tw-bg-black-10 tw-p-5 tw-rounded">
                        <pre className="tw-w-full tw-font-mono tw-text-xs">{prettyPrint(settings)}</pre>
                    </div>
                </>
            )) || <span>No Settings defined. Go to UI and add some Settings.</span>}
        </>
    );
};
