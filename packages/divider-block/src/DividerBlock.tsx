/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings } from '@frontify/app-bridge';
import { type BlockProps, joinClassNames, toRgbaString } from '@frontify/guideline-blocks-settings';
import { StyleProvider } from '@frontify/guideline-blocks-shared';

import {
    ALIGNMENT_DEFAULT_VALUE,
    COLOR_DEFAULT_RGBA_VALUE,
    HEIGHT_DEFAULT_VALUE,
    STYLE_DEFAULT_VALUE,
} from './settings';
import css from './styles.module.css';
import {
    DividerStyle,
    type Settings,
    dividerAlignmentClasses,
    dividerHeightValues,
    dividerStyleClasses,
} from './types';

export const DividerBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    return (
        <div className="divider-block">
            <StyleProvider>
                <div
                    data-test-id="divider-block"
                    className={joinClassNames([
                        'tw-flex',
                        css.dividerBlock,
                        dividerAlignmentClasses[blockSettings.alignment ?? ALIGNMENT_DEFAULT_VALUE],
                    ])}
                >
                    <div
                        data-test-id="divider-wrapper"
                        className="tw-flex tw-items-center tw-transition-all"
                        style={{
                            width: blockSettings.isWidthCustom ? blockSettings.widthCustom : blockSettings.widthSimple,
                            height: blockSettings.isHeightCustom
                                ? blockSettings.heightCustom
                                : dividerHeightValues[blockSettings.heightSimple ?? HEIGHT_DEFAULT_VALUE],
                        }}
                    >
                        <hr
                            data-test-id="divider-line"
                            className={joinClassNames([
                                'tw-border-t tw-m-0 tw-w-full',
                                dividerStyleClasses[
                                    blockSettings.isLine === DividerStyle.Solid
                                        ? (blockSettings.style ?? STYLE_DEFAULT_VALUE)
                                        : DividerStyle.NoLine
                                ],
                            ])}
                            style={{
                                borderTopWidth: blockSettings.thickness,
                                borderTopColor: blockSettings.color
                                    ? toRgbaString(blockSettings.color)
                                    : toRgbaString(COLOR_DEFAULT_RGBA_VALUE),
                            }}
                        />
                    </div>
                </div>
            </StyleProvider>
        </div>
    );
};
