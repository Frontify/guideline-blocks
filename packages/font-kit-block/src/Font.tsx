/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Badge, Text } from '@frontify/fondue';
import { FontProps } from './types';

export const Font = ({ font, placeholder, withExampleText, withStyles }: FontProps) => {
    return (
        <div data-test-id="font" className="tw-grid tw-grid-rows-font tw-grid-cols-font tw-items-center">
            <div className="tw-col-span-2">
                <Text color="weak" size="medium">
                    {font.name}
                </Text>
            </div>
            <div
                className="tw-text-default tw-font-normal tw-text-desc tw-leading-6"
                style={{ fontFamily: font.fontFamily, minHeight: '1.5rem' }}
            >
                {withExampleText ? placeholder : ''}
            </div>
            {withStyles && (
                <Badge size="s">
                    {font.numberOfStyles} {`style${font.numberOfStyles === 1 ? '' : 's'}`}
                </Badge>
            )}
        </div>
    );
};
