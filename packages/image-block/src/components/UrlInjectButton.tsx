/* eslint-disable unicorn/no-nested-ternary */
/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FileExtension, FileExtensionSets } from '@frontify/app-bridge';
import {
    ActionMenu,
    Flyout,
    IconArrowCircleUp20,
    IconExclamationMarkTriangle,
    IconImageStack20,
    LoadingCircle,
    MenuItemContentSize,
} from '@frontify/fondue';
import { type DragEventHandler, type MouseEventHandler, useRef, useState } from 'react';

// import { joinClassNames } from '../../utilities/react/joinClassNames';
import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { validateLottieUrl } from '../helpers/validateLottieUrl';

// import { type BlockInjectButtonProps } from './types';
interface UrlInjectButtonProps {
    onUrlSubmit: (url: string) => void;
    isLoading?: boolean;
    label?: string;
    // validFileType?: keyof typeof FileType;
    secondaryLabel?: string;
    icon?: JSX.Element;
    // onDrop?: (files: FileList) => void;
    fillParentContainer?: boolean;
    // onUploadClick?: () => void;
    // onAssetChooseClick?: () => void;
    // withMenu?: boolean;
    // onClick?: () => void;
    verticalLayout?: boolean;
}

export const UrlInjectButton = ({
    // onDrop,
    label,
    icon,
    secondaryLabel,
    isLoading,
    fillParentContainer,
    // onAssetChooseClick,
    // onUploadClick,
    // withMenu = true,
    // onClick,
    // validFileType,
    onUrlSubmit,
    verticalLayout,
}: UrlInjectButtonProps) => {
    // const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [menuPosition, setMenuPosition] = useState<[number, number] | undefined>();
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
            data-test-id="block-inject-button"
            className={joinClassNames([
                'tw-font-body tw-relative tw-text-sm tw-leading-4 tw-border tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-w-full first:tw-rounded-tl last:tw-rounded-br',
                verticalLayout
                    ? '[&:not(:first-child)]:tw-border-t-0 first:tw-rounded-tr last:tw-rounded-bl'
                    : '[&:not(:first-child)]:tw-border-l-0  first:tw-rounded-bl last:tw-rounded-tr',
                fillParentContainer ? 'tw-h-full' : 'tw-h-[72px]',
                menuPosition && 'tw-bg-blank-state-pressed-inverse',
                errorMsg ? '!tw-border-red-50 !tw-cursor-not-allowed' : ' tw-border-blank-state-line',
                isLoading || menuPosition || errorMsg
                    ? ''
                    : 'tw-text-text-weak hover:tw-text-blank-state-hover hover:tw-bg-blank-state-hover-inverse hover:tw-border-blank-state-line-hover active:tw-text-blank-state-pressed active:tw-bg-blank-state-pressed-inverse active:tw-border-blank-state-line-hover',
                !!menuPosition && !errorMsg
                    ? '[&>*]:tw-pointer-events-none tw-border-blank-state-line-hover'
                    : 'tw-bg-blank-state-shaded-inverse tw-text-blank-state-shaded',
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
                    <div>
                        <input
                            id="lottie-url-input"
                            className="tw-input tw-input-sm tw-w-full tw-font-normal tw-w-32 tw-h-8 tw-rounded tw-border tw-border-gray-100 .tw-border-blank-state-line"
                            placeholder="https://..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button onClick={handleSubmit}>Save</button>
                    </div>
                    {errorMsg && (
                        <div className=" tw-flex tw-items-center tw-justify-center tw-text-red-60 tw-font-medium">
                            <IconExclamationMarkTriangle />
                            {errorMsg}
                        </div>
                    )}
                </div>
            )}
            {menuPosition && (
                <div
                    className="tw-absolute tw-left-0 tw-top-full tw-z-20"
                    style={{
                        left: menuPosition[0],
                        top: menuPosition[1],
                    }}
                >
                    <Flyout
                        onOpenChange={(isOpen) => !isOpen && setMenuPosition(undefined)}
                        isOpen={true}
                        fitContent
                        hug={false}
                        legacyFooter={false}
                        trigger={<div />}
                    >
                        <ActionMenu
                            menuBlocks={[
                                {
                                    id: 'menu',
                                    menuItems: [
                                        // ...(onUploadClick
                                        //     ? [
                                        //           {
                                        //               id: 'upload',
                                        //               size: MenuItemContentSize.XSmall,
                                        //               title: 'Upload asset',
                                        //               onClick: () => {
                                        //                   onUploadClick();
                                        //                   setMenuPosition(undefined);
                                        //               },
                                        //               initialValue: true,
                                        //               decorator: (
                                        //                   <div className="tw-mr-2">
                                        //                       <IconArrowCircleUp20 />
                                        //                   </div>
                                        //               ),
                                        //           },
                                        //       ]
                                        //     : []),
                                        // ...(onAssetChooseClick
                                        //     ? [
                                        //           {
                                        //               id: 'asset',
                                        //               size: MenuItemContentSize.XSmall,
                                        //               title: 'Browse asset',
                                        //               onClick: () => {
                                        //                   onAssetChooseClick();
                                        //                   setMenuPosition(undefined);
                                        //               },
                                        //               initialValue: true,
                                        //               decorator: (
                                        //                   <div className="tw-mr-2">
                                        //                       <IconImageStack20 />
                                        //                   </div>
                                        //               ),
                                        //           },
                                        //       ]
                                        //     : []),
                                    ],
                                },
                            ]}
                        />
                    </Flyout>
                </div>
            )}
        </div>
    );
};
