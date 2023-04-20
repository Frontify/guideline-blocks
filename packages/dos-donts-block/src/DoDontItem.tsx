/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSortable } from '@dnd-kit/sortable';
import { Asset, useAssetUpload, useBlockAssets, useFileInput } from '@frontify/app-bridge';
import {
    IconArrowCircleUp20,
    IconArrowMove16,
    IconArrowSwap20,
    IconImageStack20,
    IconTrashBin16,
    IconTrashBin20,
} from '@frontify/fondue';
import { BlockItemWrapper, RichTextEditor, joinClassNames, toRgbaString } from '@frontify/guideline-blocks-shared';
import autosize from 'autosize';
import React, { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import IconComponent from './components/IconComponent';
import ImageComponent from './components/ImageComponent';
import { BlockMode, DoDontItemProps, DoDontStyle, DoDontType, SortableDoDontItemProps } from './types';
import { getPlugins } from './helpers';

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
        const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);
        const { itemImages } = blockAssets;
        const [internalTitle, setInternalTitle] = useState(title);
        const titleRef = useRef<HTMLTextAreaElement>(null);

        const [isUploadLoading, setIsUploadLoading] = useState(false);
        const [openFileDialog, { selectedFiles }] = useFileInput({ multiple: false });
        const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
            onUploadProgress: () => !isUploadLoading && setIsUploadLoading(true),
        });

        const onBodyTextChange = useCallback(
            (value: string) => value !== body && onChangeItem(id, value, 'body'),
            [onChangeItem, body, id]
        );

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
        };

        const onUploadClick = () => {
            openFileDialog();
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

        const memoizedRichTextEditor = useMemo(
            () => (
                <RichTextEditor
                    isEditing={editing}
                    designTokens={designTokens}
                    value={body}
                    onBlur={onBodyTextChange}
                    plugins={getPlugins(appBridge)}
                    placeholder="Add a description"
                />
            ),
            [body, designTokens, onBodyTextChange, editing, appBridge]
        );

        return (
            <div
                ref={ref}
                className="tw-bg-base"
                style={{ ...transformStyle, ...(!isDragging ? { zIndex: undefined } : {}) }}
            >
                <BlockItemWrapper
                    isDragging={isDragging}
                    shouldHideWrapper={replaceWithPlaceholder || !editing}
                    shouldHideComponent={replaceWithPlaceholder}
                    toolbarItems={[
                        { icon: <IconArrowMove16 />, tooltip: 'Drag to move', draggableProps },
                        { icon: <IconTrashBin16 />, tooltip: 'Delete Item', onClick: onRemoveSelf },
                    ]}
                    toolbarFlyoutItems={[
                        [
                            ...(!!linkedImage
                                ? [
                                      {
                                          title: 'Replace with upload',
                                          icon: <IconArrowCircleUp20 />,
                                          onClick: onUploadClick,
                                      },
                                      {
                                          title: 'Replace with asset',
                                          icon: <IconImageStack20 />,
                                          onClick: onOpenAssetChooser,
                                      },
                                  ]
                                : []),
                            {
                                title: type === DoDontType.Do ? 'Change to "don\'t"' : 'Change to "do"',
                                icon: <IconArrowSwap20 />,
                                onClick: () =>
                                    onChangeItem(id, type === DoDontType.Do ? DoDontType.Dont : DoDontType.Do, 'type'),
                            },
                        ],
                        [
                            {
                                title: 'Delete',
                                icon: <IconTrashBin20 />,
                                onClick: onRemoveSelf,
                            },
                        ],
                    ]}
                >
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
                                className={joinClassNames(['tw-mr-2 tw-w-auto', !internalTitle ? 'tw-opacity-30' : ''])}
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
                            <h3
                                style={{
                                    marginBottom: 0,
                                    marginTop: 0,
                                    width: '100%',
                                    lineHeight: 1,
                                    display: 'inline-flex',
                                }}
                            >
                                <textarea
                                    rows={1}
                                    ref={titleRef}
                                    onChange={(event) => setInternalTitle(event.target.value)}
                                    onBlur={() => onChangeItem(id, internalTitle, 'title')}
                                    style={
                                        {
                                            ...designTokens?.heading3,
                                            marginBottom: 0,
                                            marginTop: 0,
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
                            style={dividerStyles[type]}
                            className="tw-w-full tw-my-3 tw-h-[3px] tw-border-none tw-rounded tw-bg-black-40"
                        />
                    )}
                    <div
                        data-test-id="dos-donts-content"
                        className={style === DoDontStyle.Icons ? 'tw-mt-3' : 'tw-mt-2'}
                    >
                        {memoizedRichTextEditor}
                    </div>
                </BlockItemWrapper>
                <div
                    style={{ height: minRowHeight }}
                    className={joinClassNames([
                        !replaceWithPlaceholder && 'tw-hidden',
                        'tw-absolute tw-left-0 tw-top-0 tw-w-full tw-border-2 tw-border-box-selected-strong tw-border-dashed tw-rounded-[4px] tw-bg-box-selected-hover',
                    ])}
                />
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
            key={id}
            ref={setNodeRef}
            {...props}
            isDragging={isDragging}
            replaceWithPlaceholder={isDragging}
            transformStyle={transformStyle}
            draggableProps={draggableProps}
        />
    );
};
