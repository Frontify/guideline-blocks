/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useSortable } from '@dnd-kit/sortable';
import { merge } from '@frontify/fondue/rte';
import {
    RichTextEditor,
    getDefaultPluginsWithLinkChooser,
    hasRichTextValue,
    joinClassNames,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';
import autosize from 'autosize';
import { type CSSProperties, memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { DosDontsAssets, type DosDontsAssetsRef } from './DosDontsAssets';
import { DoDontItemWrapper } from './components/DoDontItemWrapper';
import DoDontTitle from './components/DoDontTitle';
import IconComponent from './components/IconComponent';
import { type DoDontItemProps, DoDontStyle, DoDontType, type SortableDoDontItemProps } from './types';

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
        updateAssetIdsFromKey,
        setActivatorNodeRef,
        alt,
    } = props;

    const titleRef = useRef<HTMLTextAreaElement>(null);
    const assetsRef = useRef<DosDontsAssetsRef>(null);
    const [localAltText, setLocalAltText] = useState<string | undefined>(alt);

    const doColorString = toRgbaString(doColor);
    const dontColorString = toRgbaString(dontColor);

    const onBodyTextChange = useCallback(
        (value: string) => value !== body && onChangeItem(id, { body: value }),
        [onChangeItem, body, id]
    );

    const headingColor = type === DoDontType.Do ? doColorString : dontColorString;

    const dividerStyles: Record<DoDontType, CSSProperties> = {
        [DoDontType.Do]: { backgroundColor: doColorString },
        [DoDontType.Dont]: { backgroundColor: dontColorString },
    };

    useLayoutEffect(() => {
        if (titleRef.current) {
            autosize(titleRef.current);
            autosize.update(titleRef.current);
        }
    });

    const shouldRerenderDependency = hasRichTextValue(body) && onBodyTextChange;

    const plugins = useMemo(
        () => getDefaultPluginsWithLinkChooser(appBridge),
        // oxlint-disable-next-line @eslint-react/exhaustive-deps
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
        // oxlint-disable-next-line @eslint-react/exhaustive-deps
        [body, shouldRerenderDependency, editing, appBridge, id]
    );

    return (
        <div className={merge(['tw-relative', isDragging && 'tw-bg-surface'])}>
            <DoDontItemWrapper
                id={id}
                type={type}
                editing={editing}
                isDragging={isDragging}
                replaceWithPlaceholder={replaceWithPlaceholder}
                draggableProps={draggableProps}
                setActivatorNodeRef={setActivatorNodeRef}
                linkedImage={linkedImage}
                alt={alt}
                localAltText={localAltText}
                setLocalAltText={setLocalAltText}
                onChangeItem={onChangeItem}
                onRemoveSelf={onRemoveSelf}
                onUploadClick={() => assetsRef.current?.openUpload()}
                onOpenAssetChooser={() => assetsRef.current?.openAssetChooser()}
            >
                <DosDontsAssets
                    ref={assetsRef}
                    id={id}
                    appBridge={appBridge}
                    mode={mode}
                    editing={editing}
                    linkedImage={linkedImage}
                    alt={alt}
                    onChangeItem={onChangeItem}
                    updateAssetIdsFromKey={updateAssetIdsFromKey}
                    isCustomImageHeight={isCustomImageHeight}
                    customImageHeightValue={customImageHeightValue}
                    imageDisplay={imageDisplay}
                    draggableProps={draggableProps}
                    imageHeightChoice={imageHeightChoice}
                    isDragging={isDragging}
                    type={type}
                    hasStrikethrough={hasStrikethrough}
                    backgroundColor={backgroundColor}
                    hasBackground={hasBackground}
                    hasRadius={hasRadius}
                    radiusChoice={radiusChoice}
                    borderColor={borderColor}
                    borderStyle={borderStyle}
                    borderWidth={borderWidth}
                    hasBorder={hasBorder}
                    radiusValue={radiusValue}
                    dontColor={dontColor}
                />

                <div
                    data-test-id="dos-donts-heading"
                    className="tw-flex tw-items-start tw-font-semibold"
                    style={{ color: headingColor }}
                >
                    {style === DoDontStyle.Icons && (title || hasRichTextValue(body) || editing) && (
                        <div
                            data-test-id="dos-donts-icon"
                            style={{
                                lineHeight: 'var(--f-theme-settings-heading3-line-height)',
                                fontSize: 'var(--f-theme-settings-heading3-font-size)',
                            }}
                            className={joinClassNames([
                                'tw-mr-2 tw-w-auto tw-flex tw-items-center tw-h-[1lh] tw-flex-shrink-0',
                                !title ? 'tw-opacity-70' : '',
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

                    <span
                        style={{
                            lineHeight: 'var(--f-theme-settings-heading3-line-height)',
                            fontSize: 'var(--f-theme-settings-heading3-font-size)',
                        }}
                    >
                        <DoDontTitle
                            id={id}
                            title={title}
                            editing={editing}
                            headingColor={headingColor}
                            onChangeItem={onChangeItem}
                            onChangeLocalItem={onChangeLocalItem}
                        />
                    </span>
                </div>
                {style === DoDontStyle.Underline && (
                    <hr
                        style={dividerStyles[type]}
                        className="tw-w-full tw-my-3 tw-h-[3px] tw-border-none tw-rounded-medium tw-bg-black-40"
                    />
                )}
                <div data-test-id="dos-donts-content" className={style === DoDontStyle.Icons ? 'tw-mt-3' : 'tw-mt-2'}>
                    {memoizedRichTextEditor}
                </div>
            </DoDontItemWrapper>
            <div
                className={joinClassNames([
                    !replaceWithPlaceholder && 'tw-hidden',
                    'tw-absolute tw-h-full tw-left-0 tw-top-0 tw-w-full tw-border-2 tw-border-highlight tw-border-dashed tw-rounded-sm tw-bg-container-highlight-hover',
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
            // oxlint-disable-next-line @eslint-react/set-state-in-effect
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
