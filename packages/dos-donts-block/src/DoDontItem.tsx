/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextEditor } from '@frontify/fondue';
import { joinClassNames, toRgbaString } from '@frontify/guideline-blocks-shared';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import autosize from 'autosize';
import IconComponent from './components/IconComponent';
import ItemToolbar from './components/ItemToolbar';
import { BlockMode, DoDontItemProps, DoDontStyle, DoDontType, SortableDoDontItemProps } from './types';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import ImageComponent from './components/ImageComponent';
import { Asset, useAssetUpload, useBlockAssets, useFileInput } from '@frontify/app-bridge';

export const DoDontItem = React.forwardRef<HTMLDivElement, DoDontItemProps>(
    (
        {
            id,
            type,
            style,
            doColor,
            dontColor,
            onChangeItem,
            title = '',
            body = '',
            editing = false,
            onRemoveSelf,
            hasCustomDoIcon,
            hasCustomDontIcon,
            dontIconAsset,
            doIconAsset,
            dontIconChoice,
            doIconChoice,
            hasStrikethrough,
            isDragging = false,
            columns,
            replaceWithPlaceholder = false,
            transformStyle = {},
            draggableProps = {},
            appBridge,
            linkedImage,
            minRowHeight,
            mode,
            customImageHeightValue,
            imageDisplay,
            imageHeightChoice,
            isCustomImageHeight,
            backgroundColor,
            borderColor,
            borderStyle,
            borderWidth,
            hasBackground,
            hasBorder,
            hasRadius,
            radiusChoice,
            radiusValue,
            designTokens,
        },
        ref
    ) => {
        const doColorString = toRgbaString(doColor);
        const dontColorString = toRgbaString(dontColor);
        const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
        const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
        const { itemImages } = blockAssets;
        const [internalTitle, setInternalTitle] = useState(title);
        const titleRef = useRef<HTMLTextAreaElement>(null);
        const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

        const [isUploadLoading, setIsUploadLoading] = useState(false);
        const [openFileDialog, { selectedFiles }] = useFileInput({ multiple: false });
        const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
            onUploadProgress: () => !isUploadLoading && setIsUploadLoading(true),
        });

        const headingColor = type === DoDontType.Do ? doColorString : dontColorString;

        const dividerStyles: Record<DoDontType, CSSProperties> = {
            [DoDontType.Do]: { backgroundColor: doColorString },
            [DoDontType.Dont]: { backgroundColor: dontColorString },
        };

        const onOpenAssetChooser = () => {
            appBridge.openAssetChooser(
                (result: Asset[]) => {
                    setIsUploadLoading(true);
                    const imageId = result[0]?.id;
                    const existingIds = itemImages?.map((x) => x.id) || [];
                    const newIds = [...new Set([...existingIds, imageId])];
                    updateAssetIdsFromKey('itemImages', newIds).then(() => {
                        onChangeItem(id, imageId, 'imageId');
                        setIsUploadLoading(false);
                    });
                    appBridge.closeAssetChooser();
                },
                {
                    multiSelection: false,
                }
            );
            setIsMenuOpen(false);
        };

        const onUploadClick = () => {
            openFileDialog();
            setIsMenuOpen(false);
        };

        useEffect(() => {
            if (selectedFiles) {
                setIsUploadLoading(true);
                uploadFile(selectedFiles);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [selectedFiles]);

        useEffect(() => {
            if (titleRef.current) {
                autosize(titleRef.current);
            }
        }, []);

        useEffect(() => {
            if (designTokens && titleRef.current) {
                autosize.update(titleRef.current);
            }
        }, [designTokens]);

        useEffect(() => {
            if (doneAll) {
                (async (uploadResults) => {
                    const imageId = uploadResults?.[0]?.id;
                    const existingIds = itemImages?.map((x) => x.id) || [];
                    const newIds = [...new Set([...existingIds, imageId])];
                    updateAssetIdsFromKey('itemImages', newIds).then(() => {
                        setIsUploadLoading(false);
                        onChangeItem(id, imageId, 'imageId');
                    });
                })(uploadResults);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [doneAll, uploadResults]);

        const descriptionRichTextEditor = useMemo(() => {
            return (
                <RichTextEditor
                    designTokens={designTokens ?? undefined}
                    border={false}
                    value={body}
                    onBlur={(value) => onChangeItem(id, value, 'body')}
                    placeholder={editing ? 'Add a description' : ''}
                    readonly={!editing}
                />
            );
        }, [designTokens, body, id, editing, onChangeItem]);

        return (
            <div
                ref={ref}
                className="hover:!tw-z-[2]"
                style={{ ...transformStyle, ...(isMenuOpen ? { zIndex: 2 } : {}) }}
            >
                <div
                    className={joinClassNames([
                        'tw-relative tw-group',
                        editing &&
                            !replaceWithPlaceholder &&
                            'hover:tw-outline-offset-[1px] hover:tw-outline hover:tw-outline-[1px] hover:tw-outline-box-selected-inverse',
                        isDragging && !replaceWithPlaceholder && 'tw-bg-base',
                        (isFlyoutOpen || isDragging) && !replaceWithPlaceholder && 'tw-border tw-border-line-x-strong',
                    ])}
                >
                    <div className={joinClassNames([replaceWithPlaceholder && 'tw-opacity-0'])}>
                        <div
                            className={joinClassNames([
                                'tw-absolute tw-z-20 tw-bottom-[calc(100%-4px)] tw-right-[-3px] tw-w-full',
                                editing && 'group-hover:tw-opacity-100',
                                isFlyoutOpen || isDragging ? 'tw-opacity-100' : 'tw-opacity-0',
                            ])}
                        >
                            <ItemToolbar
                                id={id}
                                onRemoveSelf={onRemoveSelf}
                                type={type}
                                onChangeItem={onChangeItem}
                                isFlyoutOpen={isFlyoutOpen}
                                setIsFlyoutOpen={setIsFlyoutOpen}
                                draggableProps={draggableProps}
                                isDragging={isDragging}
                                onAssetChooseClick={linkedImage ? onOpenAssetChooser : undefined}
                                onUploadClick={linkedImage ? onUploadClick : undefined}
                            />
                        </div>
                        {mode === BlockMode.TEXT_AND_IMAGE && (
                            <ImageComponent
                                isEditing={editing}
                                id={id}
                                src={linkedImage}
                                columns={columns}
                                onAssetChooseClick={onOpenAssetChooser}
                                onUploadClick={onUploadClick}
                                isUploadLoading={isUploadLoading}
                                isCustomImageHeight={isCustomImageHeight}
                                customImageHeightValue={customImageHeightValue}
                                imageDisplay={imageDisplay}
                                draggableProps={draggableProps}
                                imageHeightChoice={imageHeightChoice}
                                isDragging={isDragging}
                                hasStrikethrough={type === DoDontType.Dont && hasStrikethrough}
                                backgroundColor={backgroundColor}
                                hasBackground={hasBackground}
                                hasRadius={hasRadius}
                                radiusChoice={radiusChoice}
                                border={hasBorder ? `${borderWidth} ${borderStyle} ${toRgbaString(borderColor)}` : ''}
                                radiusValue={radiusValue}
                                onClick={() => setIsMenuOpen(true)}
                                dontColor={dontColor}
                            />
                        )}
                        <div
                            data-test-id="dos-donts-heading"
                            className="tw-flex tw-items-start tw-font-semibold tw-text-l"
                            style={{ color: headingColor }}
                        >
                            {style === DoDontStyle.Icons && (title || body || editing) && (
                                <div
                                    data-test-id="dos-donts-icon"
                                    className={joinClassNames([
                                        'tw-mr-2 tw-w-auto',
                                        !internalTitle ? 'tw-opacity-30' : '',
                                    ])}
                                >
                                    <IconComponent
                                        type={type}
                                        hasCustomDoIcon={hasCustomDoIcon}
                                        doIconChoice={doIconChoice}
                                        doIconAsset={doIconAsset}
                                        hasCustomDontIcon={hasCustomDontIcon}
                                        dontIconChoice={dontIconChoice}
                                        dontIconAsset={dontIconAsset}
                                    />
                                </div>
                            )}
                            <div className="tw-w-full tw-flex tw-items-center">
                                <h3 style={{ marginBottom: 0 }}>
                                    <textarea
                                        rows={1}
                                        ref={titleRef}
                                        onChange={(event) => {
                                            setInternalTitle(event.target.value);
                                        }}
                                        onBlur={() => {
                                            onChangeItem(id, internalTitle, 'title');
                                        }}
                                        style={
                                            {
                                                ...designTokens?.heading3,
                                                marginBottom: 0,
                                                color: headingColor,
                                                '--placeholder-color': headingColor,
                                            } as CSSProperties
                                        }
                                        value={internalTitle}
                                        disabled={!editing}
                                        placeholder={editing ? 'Add a title' : ''}
                                        className="tw-text-s tw-pointer-ev tw-w-full tw-placeholder-[var(--placeholder-color)] placeholder:tw-opacity-30 tw-placeholder-opacity-30 tw-bg-transparent tw-resize-none tw-text-text-weak tw-break-words tw-outline-none tw-whitespace-pre-wrap"
                                    />
                                </h3>
                            </div>
                        </div>
                        {style === DoDontStyle.Underline && (
                            <hr
                                style={dividerStyles[type as DoDontType]}
                                className="tw-w-full tw-my-3 tw-h-[3px] tw-border-none tw-rounded tw-bg-black-40"
                            />
                        )}
                        <div
                            data-test-id="dos-donts-content"
                            className={style === DoDontStyle.Icons ? 'tw-mt-3' : 'tw-mt-2'}
                        >
                            {descriptionRichTextEditor}
                        </div>
                    </div>
                    <div
                        style={{ height: minRowHeight }}
                        className={joinClassNames([
                            !replaceWithPlaceholder && 'tw-hidden',
                            'tw-absolute tw-left-0 tw-top-0 tw-w-full tw-border-2 tw-border-box-selected-strong tw-border-dashed tw-rounded-[4px] tw-bg-box-selected-hover',
                        ])}
                    ></div>
                </div>
            </div>
        );
    }
);

DoDontItem.displayName = 'DoDontItem';

export const SortableDoDontItem = (props: SortableDoDontItemProps) => {
    const { id, editing } = props;
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
    });

    const transformStyle = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
        transition,
        zIndex: isDragging ? 2 : 1,
    };

    const draggableProps = editing ? { ...attributes, ...listeners } : {};

    return (
        <DoDontItem
            ref={setNodeRef}
            {...props}
            isDragging={isDragging}
            replaceWithPlaceholder={isDragging}
            transformStyle={transformStyle}
            draggableProps={draggableProps}
        />
    );
};
