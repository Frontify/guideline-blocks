/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconClipboard, IconCrossCircle, useCopy } from '@frontify/fondue';
import { useContext } from 'react';
import { SettingsContext } from '../SettingsContext';

const prettyPrint = (json: {}): string => {
    return JSON.stringify(json, undefined, 2);
};

export const SettingsCode = () => {
    const source = useContext(SettingsContext);
    const { copy, status } = useCopy();

    return (
        <>
            {(source.settings && (
                <>
                    <span className="tw-float-right tw-p-3">
                        <button
                            className={
                                'tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded tw-text-black-60 hover:tw-text-black-100'
                            }
                            onClick={() => copy(prettyPrint(source.settings ?? ''))}
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
                                <span className="tw-text-box-positive-strong">
                                    <IconCheckMark />
                                </span>
                            )}
                        </button>
                    </span>
                    <div className="tw-bg-black-10 tw-p-5 tw-rounded">
                        <pre className="tw-w-full tw-font-mono tw-text-xs">{prettyPrint(source.settings)}</pre>
                    </div>
                </>
            )) || <span>No Settings defined. Go to UI and add some Settings.</span>}
        </>
    );
};
