/* eslint-disable unicorn/no-nested-ternary */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LoadingCircle } from '@frontify/fondue';
import { useRef, useState } from 'react';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { validateLottieUrl } from '../helpers/validateLottieUrl';

interface UrlInjectButtonProps {
    onUrlSubmit: (url: string) => void;
    isLoading?: boolean;
    label?: string;
    secondaryLabel?: string;
    icon?: JSX.Element;
    fillParentContainer?: boolean;
    verticalLayout?: boolean;
    isDisabled: boolean;
}

export const UrlInjectButton = ({
    label,
    icon,
    isLoading,
    fillParentContainer,
    onUrlSubmit,
    isDisabled,
}: UrlInjectButtonProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async () => {
        const lottieValidation = await validateLottieUrl(inputValue);
        if (lottieValidation.isValid) {
            onUrlSubmit(lottieValidation.validatedUrl);
        } else {
            setErrorMsg(lottieValidation.errorMessage);
        }
    };

    return (
        <div
            ref={divRef}
            data-test-id="url-inject-button"
            className={joinClassNames([
                'tw-font-body tw-relative tw-text-sm tw-leading-4  tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-w-full tw-rounded',
                isDisabled && 'tw-pointer-events-none',
                fillParentContainer ? 'tw-h-full' : 'tw-h-[72px]',
                errorMsg ? '!tw-border-red-50 !tw-cursor-not-allowed' : ' tw-border-blank-state-line',
                isLoading || errorMsg
                    ? ''
                    : 'tw-text-text-weak hover:tw-text-blank-state-hover hover:tw-bg-blank-state-hover-inverse hover:tw-border-blank-state-line-hover active:tw-text-blank-state-pressed active:tw-bg-blank-state-pressed-inverse active:tw-border-blank-state-line-hover',
            ])}
        >
            {isLoading ? (
                <LoadingCircle />
            ) : (
                <div className="tw-flex tw-flex-col tw-items-center">
                    <div className="tw-flex tw-flex-row tw-items-center tw-gap-1 tw-pb-2">
                        <div>{icon}</div>
                        <div className="tw-font-medium">{label}</div>
                    </div>
                    <div className="tw-flex tw-flex-row tw-gap-x-3">
                        <input
                            id="lottie-url-input"
                            className="tw-flex tw-items-center tw-h-9 tw-gap-2 tw-px-3 tw-border tw-transition tw-rounded tw-text-body-small tw-font-sans tw-relative tw-bg-base dark:tw-bg-transparent tw-border-solid focus-within:tw-border-line-xx-strong focus-within:hover:tw-border-line-xx-strong hover:tw-border-line-x-strong tw-border-line-strong dark:tw-border-line-strong"
                            placeholder="https://..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button
                            className="tw-bg-button-strong-background tw-border-button-strong-border hover:tw-bg-button-strong-background-hover active:tw-bg-button-strong-background-pressed  tw-group tw-border tw-box-box tw-relative tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-outline-none tw-font-body tw-font-medium  tw-rounded tw-px-4 tw-h-9 tw-text-body-medium"
                            onClick={handleSubmit}
                        >
                            <span className="tw-text-button-strong-icon group-hover:tw-text-button-strong-icon-hover group-active:tw-text-button-strong-text-pressed ">
                                Save
                            </span>
                        </button>
                    </div>
                    {errorMsg && (
                        <div className=" tw-flex tw-items-center tw-justify-center tw-text-red-60  tw-pt-3">
                            {errorMsg}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
