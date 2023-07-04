/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ChangeEvent, DragEvent, FC, useRef, useState } from 'react';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { AssetDropzoneStyling, BackgroundActive, BackgroundBase, contentCenter } from './styling';
import { IconPlus24, IconSize, LegacyStack, Text } from '@frontify/fondue';

type AssetDropzoneProps = {
    onFileUpload: (payload: FileList) => void;
};

export const AssetDropzone: FC<AssetDropzoneProps> = ({ onFileUpload }) => {
    const [highlight, setHighlight] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDropOver = (dragOver: DragEvent<HTMLButtonElement>) => {
        dragOver.preventDefault();
        setHighlight(true);
    };

    const handleDragLeave = (dragLeave: DragEvent<HTMLButtonElement>) => {
        dragLeave.preventDefault();
        setHighlight(false);
    };

    const handleDrop = (drop: DragEvent<HTMLButtonElement>) => {
        drop.preventDefault();
        const files = drop.dataTransfer.files;
        onFileUpload(files);
        setHighlight(false);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleKeyDown = (keyDown: React.KeyboardEvent<HTMLButtonElement>) => {
        if (keyDown.key === 'Enter') {
            keyDown.preventDefault();
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files as FileList;
        onFileUpload(files);
    };

    return (
        <button
            className={joinClassNames([AssetDropzoneStyling, !highlight ? BackgroundBase : BackgroundActive])}
            onDragOver={handleDropOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            ref={buttonRef}
        >
            <input type="file" className="tw-hidden" onChange={handleFileChange} ref={fileInputRef} multiple />
            <div className={contentCenter}>
                <LegacyStack padding="none" spacing="s" align="center">
                    <div className={'tw-text-[var(--text-color-weak)]'}>
                        <IconPlus24 size={IconSize.Size24} />
                    </div>
                    <LegacyStack padding="none" spacing="xxs" direction="column" align="start">
                        <Text as="p" color="weak" overflow="visible" size="medium" weight="default">
                            Add or drop your assets here
                        </Text>
                    </LegacyStack>
                </LegacyStack>
            </div>
        </button>
    );
};
