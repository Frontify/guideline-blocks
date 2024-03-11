/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSortable } from '@dnd-kit/sortable';
import { Asset, useAssetChooser, useAssetUpload, useFileInput } from '@frontify/app-bridge';
import {
    IconArrowCircleUp20,
    IconArrowMove16,
    IconArrowSwap20,
    IconImageStack20,
    IconTrashBin16,
    IconTrashBin20,
} from '@frontify/fondue';
import {
    BlockItemWrapper,
    BlockStyles,
    RichTextEditor,
    getDefaultPluginsWithLinkChooser,
    hasRichTextValue,
    joinClassNames,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';
import autosize from 'autosize';
import { CSSProperties, memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import IconComponent from './components/IconComponent';
import ImageComponent from './components/ImageComponent';
import { BlockMode, DoDontItemProps, DoDontStyle, DoDontType, SortableDoDontItemProps } from './types';

export const DoDontItem = memo((props: DoDontItemProps) => {
    const {
        id,
        type,
        style,
        doColor,
        dontColor,
        onChangeItem,
        onChangeLocalItem,
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
        replaceWithPlaceholder = false,
        draggableProps = {},
        appBridge,
        linkedImage,
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
        addAssetIdsToKey,
        setActivatorNodeRef,
    } = props;
    const doColorString = toRgbaString(doColor);
    const dontColorString = toRgbaString(dontColor);
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
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
        openAssetChooser(
            (result: Asset[]) => {
                setIsUploadLoading(true);
                const imageId = result[0]?.id;
                addAssetIdsToKey('itemImages', [imageId]).then(() => {
                    onChangeItem(id, imageId, 'imageId');
                    setIsUploadLoading(false);
                });
                closeAssetChooser();
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

    useLayoutEffect(() => {
        if (titleRef.current) {
            autosize(titleRef.current);
            autosize.update(titleRef.current);
        }
    });

    useEffect(() => {
        if (doneAll) {
            (async (uploadResults) => {
                const imageId = uploadResults?.[0]?.id;
                addAssetIdsToKey('itemImages', [imageId]).then(() => {
                    setIsUploadLoading(false);
                    onChangeItem(id, imageId, 'imageId');
                });
            })(uploadResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doneAll, uploadResults]);

    const shouldRerenderDependency = hasRichTextValue(body) && onBodyTextChange;

    const plugins = useMemo(
        () => getDefaultPluginsWithLinkChooser(appBridge),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const memoizedRichTextEditor = useMemo(
        () => (
            <RichTextEditor
                id={`${appBridge.getBlockId()}-${id}-editor`}
                isEditing={editing}
                value={body}
                onTextChange={onBodyTextChange}
                plugins={plugins}
                placeholder="Add a description"
            />
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [body, shouldRerenderDependency, editing, appBridge, id]
    );

    return (
        <div className="tw-bg-base tw-relative" style={{ ...(!isDragging ? { zIndex: undefined } : {}) }}>
            <BlockItemWrapper
                isDragging={isDragging}
                shouldHideWrapper={replaceWithPlaceholder || !editing}
                shouldHideComponent={replaceWithPlaceholder}
                shouldBeShown={isDragging}
                toolbarItems={[
                    { type: 'dragHandle', icon: <IconArrowMove16 />, draggableProps, setActivatorNodeRef },
                    { type: 'button', icon: <IconTrashBin16 />, tooltip: 'Delete Item', onClick: onRemoveSelf },
                    {
                        type: 'menu',
                        items: [
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
                                        onChangeItem(
                                            id,
                                            type === DoDontType.Do ? DoDontType.Dont : DoDontType.Do,
                                            'type'
                                        ),
                                },
                            ],
                            [
                                {
                                    title: 'Delete',
                                    icon: <IconTrashBin20 />,
                                    onClick: onRemoveSelf,
                                },
                            ],
                        ],
                    },
                ]}
            >
                {mode === BlockMode.TEXT_AND_IMAGE && (
                    <ImageComponent
                        isEditing={editing}
                        id={id}
                        image={linkedImage}
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
                            style={{
                                height: 'var(--f-theme-settings-heading3-line-height)',
                                fontSize: 'var(--f-theme-settings-heading3-font-size)',
                            }}
                            className={joinClassNames([
                                'tw-mr-2 tw-w-auto tw-flex tw-items-center',
                                !title ? 'tw-opacity-30' : '',
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
                        <span
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
                                onChange={(event) => onChangeLocalItem(id, event.target.value, 'title')}
                                onBlur={() => onChangeItem(id, title, 'title')}
                                style={
                                    {
                                        ...BlockStyles.heading3,
                                        marginBottom: 0,
                                        marginTop: 0,
                                        color: headingColor,
                                        '--placeholder-color': headingColor,
                                        '-webkit-text-fill-color': headingColor,
                                    } as CSSProperties
                                }
                                value={title}
                                disabled={!editing}
                                aria-label="Title"
                                placeholder={editing ? 'Add a title' : ''}
                                className="tw-text-s tw-pointer-ev tw-w-full tw-placeholder-[var(--placeholder-color)] placeholder:tw-opacity-30 tw-placeholder-opacity-30 tw-bg-transparent tw-resize-none tw-text-text-weak tw-break-words tw-outline-none tw-whitespace-pre-wrap"
                            />
                        </span>
                    </div>
                </div>
                {style === DoDontStyle.Underline && (
                    <hr
                        style={dividerStyles[type]}
                        className="tw-w-full tw-my-3 tw-h-[3px] tw-border-none tw-rounded tw-bg-black-40"
                    />
                )}
                <div data-test-id="dos-donts-content" className={style === DoDontStyle.Icons ? 'tw-mt-3' : 'tw-mt-2'}>
                    {memoizedRichTextEditor}
                </div>
            </BlockItemWrapper>
            <div
                className={joinClassNames([
                    !replaceWithPlaceholder && 'tw-hidden',
                    'tw-absolute tw-h-full tw-left-0 tw-top-0 tw-w-full tw-border-2 tw-border-box-selected-strong tw-border-dashed tw-rounded-[4px] tw-bg-box-selected-hover',
                ])}
            />
        </div>
    );
});

DoDontItem.displayName = 'DoDontItem';

export const SortableDoDontItem = (props: SortableDoDontItemProps) => {
    const { id, editing } = props;
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
        id,
    });
    const [draggableProps, setDraggableProps] = useState<Record<string, unknown>>(
        editing ? { ...attributes, ...listeners } : {}
    );
    const transformStyle = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
        transition,
        zIndex: isDragging ? 2 : 1,
    };

    useEffect(() => {
        if (!isDragging) {
            setDraggableProps(editing ? { ...attributes, ...listeners } : {});
        }
    }, [isDragging, attributes, listeners, editing]);

    return (
        <div style={transformStyle} ref={setNodeRef}>
            <DoDontItem
                key={id}
                {...props}
                isDragging={isDragging}
                replaceWithPlaceholder={isDragging}
                draggableProps={draggableProps}
                setActivatorNodeRef={setActivatorNodeRef}
            />
        </div>
    );
};
