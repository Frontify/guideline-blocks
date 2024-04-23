/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { DividerBlock } from './DividerBlock';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { DividerAlignment, DividerHeight, DividerStyle } from './types';

const DividerBlockSelector = 'divider-block';
const DividerLine = 'divider-line';
const DividerWrapper = 'divider-wrapper';

const EXAMPLE_COLOR = { red: 22, green: 181, blue: 181, alpha: 1, name: 'Java' };

describe('Divider Block', () => {
    it('should render a divider block', () => {
        const [DividerBlockStub] = withAppBridgeBlockStubs(DividerBlock);
        const { getByTestId } = render(<DividerBlockStub />);

        expect(getByTestId(DividerBlockSelector)).exist;
    });

    it('should render a divider block without line', () => {
        const [DividerBlockWithStubs] = withAppBridgeBlockStubs(DividerBlock, {
            blockSettings: {
                isLine: DividerStyle.NoLine,
            },
        });

        const { getByTestId } = render(<DividerBlockWithStubs />);
        expect(getByTestId(DividerLine)).toHaveClass('tw-border-none');
    });

    it('should render a divider block with the correct layout', () => {
        const [DividerBlockWithStubs] = withAppBridgeBlockStubs(DividerBlock, {
            blockSettings: {
                alignment: DividerAlignment.Center,
                heightSimple: DividerHeight.Medium,
            },
        });

        const { getByTestId } = render(<DividerBlockWithStubs />);

        expect(getByTestId(DividerBlockSelector)).toHaveClass('tw-justify-center');
        expect(getByTestId(DividerWrapper)).toHaveStyle('height: 60px');
    });

    it('should render a divider block with the correct styling', () => {
        const [DividerBlockWithStubs] = withAppBridgeBlockStubs(DividerBlock, {
            blockSettings: {
                isLine: DividerStyle.Solid,
                color: EXAMPLE_COLOR,
                style: DividerStyle.Dashed,
                thickness: '1px',
            },
        });

        const { getByTestId } = render(<DividerBlockWithStubs />);
        expect(getByTestId(DividerLine)).toHaveClass('tw-border-dashed');
        expect(getByTestId(DividerLine)).toHaveStyle('border-top-width: 1px');
        expect(getByTestId(DividerLine)).toHaveStyle('border-top-color: rgb(22, 181, 181)');
    });
});
