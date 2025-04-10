/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSortable } from '@dnd-kit/sortable';
import { Asset, useAssetChooser, useAssetUpload, useFileInput } from '@frontify/app-bridge';
import {
    IconArrowCircleUp20,
    IconArrowMove16,
    IconArrowSwap20,
    IconImageStack20,
    IconSpeechBubbleQuote20,
    IconTrashBin16,
    IconTrashBin20,
    merge,
} from '@frontify/fondue';
import {
    AssetChooserObjectType,
    BlockItemWrapper,
    BlockStyles,
    FileExtensionSets,
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
import { EditAltTextFlyout } from '@frontify/guideline-blocks-shared';

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
        alt,
    } = props;
    const [showAltTextMenu, setShowAltTextMenu] = useState(false);
    const [localAltText, setLocalAltText] = useState<string | undefined>(alt);

    const doColorString = toRgbaString(doColor);
    const dontColorString = toRgbaString(dontColor);
    const { openAssetChooser, closeAssetChooser } = useAssetChooser(appBridge);
    const titleRef = useRef<HTMLTextAreaElement>(null);

    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const [openFileDialog, { selectedFiles }] = useFileInput({
        multiple: false,
        accept: 'image/*',
    });
    const [uploadFile, { results: uploadResults, doneAll }] = useAssetUpload({
        onUploadProgress: () => !isUploadLoading && setIsUploadLoading(true),
    });

    const onBodyTextChange = useCallback(
        (value: string) => value !== body && onChangeItem(id, { body: value }),
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
                const imageAlt = alt ?? result[0]?.title ?? result[0]?.fileName ?? '';
                setLocalAltText(imageAlt);
                if (addAssetIdsToKey) {
                    addAssetIdsToKey(id, [imageId]).then(() => {
                        onChangeItem(id, { imageId, alt: imageAlt });
                        setIsUploadLoading(false);
                    });
                }

                closeAssetChooser();
            },
            {
                multiSelection: false,
                objectTypes: [AssetChooserObjectType.ImageVideo],
                extensions: FileExtensionSets.Images,
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
                const imageAlt = alt ?? uploadResults?.[0]?.title ?? uploadResults?.[0]?.fileName ?? '';
                setLocalAltText(imageAlt);
                if (addAssetIdsToKey) {
                    addAssetIdsToKey(id, [imageId]).then(() => {
                        setIsUploadLoading(false);
                        onChangeItem(id, { imageId, alt: imageAlt });
                    });
                }
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
                id={`${appBridge.context('blockId').get()}-${id}-editor`}
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
        <div className={merge(['tw-relative', isDragging && 'tw-bg-base'])}>
            <BlockItemWrapper
                isDragging={isDragging}
                shouldHideWrapper={replaceWithPlaceholder || !editing}
                shouldHideComponent={replaceWithPlaceholder}
                shouldBeShown={isDragging}
                toolbarItems={[
                    { type: 'dragHandle', icon: <IconArrowMove16 />, draggableProps, setActivatorNodeRef },
                    {
                        type: 'button',
                        icon: <IconTrashBin16 />,
                        tooltip: 'Delete Item',
                        onClick: () => onRemoveSelf(id),
                    },
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
                                        onChangeItem(id, {
                                            type: type === DoDontType.Do ? DoDontType.Dont : DoDontType.Do,
                                        }),
                                },
                                {
                                    title: 'Set alt text',
                                    onClick: () => setShowAltTextMenu(true),
                                    icon: <IconSpeechBubbleQuote20 />,
                                },
                            ],
                            [
                                {
                                    title: 'Delete',
                                    icon: <IconTrashBin20 />,
                                    onClick: () => onRemoveSelf(id),
                                },
                            ],
                        ],
                    },
                ]}
            >
                <EditAltTextFlyout
                    setShowAltTextMenu={setShowAltTextMenu}
                    showAltTextMenu={showAltTextMenu}
                    setLocalAltText={setLocalAltText}
                    defaultAltText={alt}
                    onSave={() => onChangeItem(id, { alt: localAltText })}
                    localAltText={localAltText}
                />
                {mode === BlockMode.TEXT_AND_IMAGE && (
                    <ImageComponent
                        isEditing={editing}
                        id={id}
                        alt={alt}
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
                    {style === DoDontStyle.Icons && (title || hasRichTextValue(body) || editing) && (
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
                                onBlur={() => onChangeItem(id, { title })}
                                style={
                                    {
                                        ...BlockStyles.heading3,
                                        marginBottom: 0,
                                        marginTop: 0,
                                        color: headingColor,
                                        WebkitTextFillColor: headingColor,
                                        '--placeholder-color': headingColor,
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
                    'tw-absolute tw-h-full tw-left-0 tw-top-0 tw-w-full tw-border-2 tw-border-box-selected-strong tw-border-dashed tw-rounded-sm tw-bg-box-selected-hover',
                ])}
            />
        </div>
    );
});

DoDontItem.displayName = 'DoDontItem';

export const SortableDoDontItem = memo((props: SortableDoDontItemProps) => {
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
});

SortableDoDontItem.displayName = 'SortableDoDontItem';
