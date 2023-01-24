/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color as AppBridgeColor, useBlockSettings, useColorPalettes, useEditorState } from '@frontify/app-bridge';
import {
    Button,
    ButtonEmphasis,
    ButtonGroup,
    ButtonSize,
    Color,
    IconArrowStretchBox12,
    IconPlus12,
    Palette,
} from '@frontify/fondue';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { FC, useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ColorPickerFlyout } from './components/ColorPickerFlyout';
import { ColorSquare } from './components/ColorSquare';
import { EmptyView } from './components/EmptyView';
import { MINIMUM_COLOR_WIDTH } from './helpers';
import { ColorProps, Settings, spacingValues } from './types';

export const ColorScaleBlock: FC<BlockProps> = ({ appBridge }) => {
    const { colorPalettes: appBridgePalettes } = useColorPalettes(appBridge);
    const [colorPickerPalettes, setColorPickerPalettes] = useState<Palette[]>([]);
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
    const [displayableItems, setDisplayableItems] = useState<ColorProps[]>(blockSettings.colorInput ?? []);
    const colorScaleBlockRef = useRef<HTMLDivElement>(null);

    const height = blockSettings.customHeight ? blockSettings.heightInput : spacingValues[blockSettings.heightSlider];
    const totalWidth = displayableItems.reduce((acc, color) => acc + color.width, 0);

    useEffect(() => {
        setColorPickerPalettes(
            appBridgePalettes.map((palette) => {
                const colors = palette.colors.map((color) => {
                    return {
                        alpha: color.alpha ? color.alpha / 255 : 1,
                        red: color.red ?? 0,
                        green: color.green ?? 0,
                        blue: color.blue ?? 0,
                        name: color.name ?? '',
                    };
                });

                return {
                    id: palette.id,
                    title: palette.name,
                    colors,
                };
            })
        );
    }, [appBridgePalettes, appBridge]);

    const getColorId = (selectedColor: Color) => {
        let color: AppBridgeColor | undefined;

        for (const palette of appBridgePalettes) {
            if (color) {
                break;
            }

            color = palette.colors.find(
                (paletteColor) =>
                    paletteColor.red === selectedColor.red &&
                    paletteColor.blue === selectedColor.blue &&
                    paletteColor.green === selectedColor.green
            );
        }

        // disabling it here because Flyout can not have color
        // that is outside of colorPalettes scope
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return color!.id;
    };

    const handleAddNewColorToBlockSettings = (flyoutColor: Color) => {
        const id = getColorId(flyoutColor);

        const colorExists = displayableItems.some((color) => color.id === id);
        if (colorExists) {
            // TODO add proper error handling
            console.warn("can't add new color as color already exists");
            return;
        }

        const updateColors = [...displayableItems];
        updateColors.push({
            ...flyoutColor,
            // eslint-disable-next-line unicorn/explicit-length-check
            width: ((totalWidth || colorScaleBlockRef.current?.clientWidth) ?? 800) / (updateColors.length || 1),
            id,
        });
        const normalize =
            updateColors.reduce((acc, color) => acc + color.width, 0) /
                (colorScaleBlockRef.current?.clientWidth ?? 800) || 1;

        const newDisplayableItems = updateColors.map((color) => ({
            ...color,
            width: color.width > MINIMUM_COLOR_WIDTH ? color.width / normalize : MINIMUM_COLOR_WIDTH,
        }));
        setDisplayableItems(newDisplayableItems);
        setBlockSettings({ colorInput: newDisplayableItems });
    };

    const handleResizeEvenly = () => {
        const updateColor = displayableItems.map((color) => ({
            ...color,
            width: totalWidth / displayableItems.length,
        }));
        setDisplayableItems(updateColor);
        setBlockSettings({ colorInput: updateColor });
    };

    const onDelete = (color: ColorProps) => {
        const widthToAdd = color.width / (displayableItems.length - 1);
        const updatedColors = displayableItems
            .filter(({ id }) => id !== color.id)
            .map((color) => ({
                ...color,
                width: color.width + widthToAdd,
            }));

        setDisplayableItems(updatedColors);
        setBlockSettings({ colorInput: updatedColors });
    };

    return (
        <>
            <div
                ref={colorScaleBlockRef}
                data-test-id="color-scale-block"
                className="tw-w-full tw-mb-4 tw-rounded"
                style={{
                    height,
                }}
            >
                {displayableItems.length > 0 ? (
                    <DndProvider backend={HTML5Backend}>
                        <div className="tw-h-full tw-flex tw-relative tw-rounded tw-overflow-hidden tw-border tw-border-line tw-gap-px">
                            {displayableItems.map((color) => {
                                return (
                                    <ColorSquare
                                        key={color.id}
                                        blockId={appBridge.getBlockId()}
                                        color={color}
                                        width={color.width}
                                        totalWidth={totalWidth}
                                        isEditing={isEditing}
                                        onDelete={onDelete}
                                        onDrop={() => {
                                            setBlockSettings({ colorInput: displayableItems });
                                        }}
                                        setDisplayableItems={setDisplayableItems}
                                    />
                                );
                            })}
                            {isEditing &&
                                Array(displayableItems.length - 1)
                                    .fill(null)
                                    .map((_, idx) => {
                                        const widthPercentage =
                                            (displayableItems
                                                .slice(0, idx + 1)
                                                .reduce((prev, curr) => prev + curr.width, 0) /
                                                totalWidth) *
                                            100;
                                        return (
                                            <div
                                                key={idx}
                                                style={{
                                                    left: `${widthPercentage}%`,
                                                }}
                                                className="tw-absolute group-hover:tw-flex -tw-ml-1 tw-w-2 tw-flex tw-h-full tw-items-center tw-justify-center tw-cursor-ew-resize tw-opacity-0 hover:tw-opacity-100"
                                                onMouseDown={(e) => {
                                                    const startX = e.clientX;
                                                    const startWidth = displayableItems[idx].width;
                                                    const nextWidth = displayableItems[idx + 1].width;

                                                    const onMouseMove = (e: MouseEvent) => {
                                                        const diff = e.clientX - startX;
                                                        const percentage =
                                                            totalWidth /
                                                            (colorScaleBlockRef.current?.clientWidth ?? 800);
                                                        const newWidth = startWidth + diff * percentage;
                                                        const newNextWidth = nextWidth - diff * percentage;
                                                        if (
                                                            newWidth > MINIMUM_COLOR_WIDTH &&
                                                            newNextWidth > MINIMUM_COLOR_WIDTH
                                                        ) {
                                                            setDisplayableItems((prev) => {
                                                                const newColors = [...prev];
                                                                newColors[idx].width = newWidth;
                                                                newColors[idx + 1].width = newNextWidth;
                                                                return newColors;
                                                            });
                                                        }
                                                    };
                                                    const onMouseUp = () => {
                                                        window.removeEventListener('mousemove', onMouseMove);
                                                        window.removeEventListener('mouseup', onMouseUp);
                                                        setBlockSettings({ colorInput: displayableItems });
                                                    };
                                                    window.addEventListener('mousemove', onMouseMove);
                                                    window.addEventListener('mouseup', onMouseUp);
                                                }}
                                            >
                                                <div
                                                    data-test-id="drag-handle"
                                                    className="tw-bg-black-20 tw-rounded-full tw-w-2 tw-h-6"
                                                />
                                            </div>
                                        );
                                    })}
                        </div>
                    </DndProvider>
                ) : (
                    <EmptyView />
                )}
            </div>

            {isEditing && (
                <div data-test-id="color-scale-block-editor-mode-buttons" className="tw-text-right">
                    <ButtonGroup size={ButtonSize.Small}>
                        <Button
                            emphasis={ButtonEmphasis.Default}
                            onClick={handleResizeEvenly}
                            size={ButtonSize.Small}
                            icon={<IconArrowStretchBox12 />}
                            disabled={displayableItems.length < 2}
                        >
                            Resize Evenly
                        </Button>
                        <ColorPickerFlyout
                            onAdd={handleAddNewColorToBlockSettings}
                            isOpen={isColorPickerOpen}
                            onClose={() => setIsColorPickerOpen(false)}
                            colorPickerFlyoutPalettes={colorPickerPalettes}
                        >
                            <Button
                                emphasis={ButtonEmphasis.Default}
                                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                                size={ButtonSize.Small}
                                icon={<IconPlus12 />}
                                disabled={
                                    (colorScaleBlockRef.current?.clientWidth ?? 800) / displayableItems.length <=
                                    MINIMUM_COLOR_WIDTH
                                }
                            >
                                Add Color
                            </Button>
                        </ColorPickerFlyout>
                    </ButtonGroup>
                </div>
            )}
        </>
    );
};
