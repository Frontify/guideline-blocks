/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Radius } from '@frontify/guideline-blocks-settings';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ImageStage } from './ImageStage';

type Observation = { element?: Element; isDisconnected: boolean };

describe('ImageStage', () => {
    let observations: Observation[];

    const liveObservedElements = () =>
        observations.filter(({ isDisconnected }) => !isDisconnected).map(({ element }) => element);

    beforeEach(() => {
        vi.unstubAllGlobals();
        observations = [];

        const MockResizeObserver = vi.fn(function () {
            const observation: Observation = { isDisconnected: false };
            observations.push(observation);

            return {
                observe: (element: Element) => {
                    observation.element = element;
                },
                disconnect: () => {
                    observation.isDisconnected = true;
                },
            };
        });

        vi.stubGlobal('ResizeObserver', MockResizeObserver);
    });

    it('should keep observing the rendered stage after entering and leaving fullscreen', async () => {
        render(
            <ImageStage
                title="Figma frame"
                url="https://example.com/frame.png"
                hasLimitedOptions={false}
                isMobile={false}
                borderStyle="solid"
                borderColor={{ red: 0, green: 0, blue: 0, alpha: 1 }}
                borderWidth="1px"
                hasRadius={false}
                radiusValue="0px"
                radiusChoice={Radius.None}
                allowFullScreen
                allowZooming
            />
        );

        // Entering and leaving fullscreen swaps the stage between inline and a portal, which remounts its nodes.
        await userEvent.click(screen.getByTestId('fondue-icons-arrow-expand').closest('button') as HTMLButtonElement);

        expect(liveObservedElements()).toHaveLength(1);
        expect(liveObservedElements()[0]?.isConnected).toBe(true);

        await userEvent.click(screen.getByTestId('fondue-icons-cross').closest('button') as HTMLButtonElement);

        expect(liveObservedElements()).toHaveLength(1);
        expect(liveObservedElements()[0]?.isConnected).toBe(true);
    });
});
