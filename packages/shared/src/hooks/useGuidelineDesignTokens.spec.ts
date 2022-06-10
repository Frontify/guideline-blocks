/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react-hooks';
import mitt from 'mitt';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { DesignTokenApiResponse, useGuidelineDesignTokens } from './useGuidelineDesignTokens';

const emitter = mitt<{ HubAppearanceUpdated: DesignTokenApiResponse['hub'] }>();

window.emitter = emitter;
window.location = { ...window.location, origin: 'http://api.dev' };

enum ResponseStatus {
    Success = 'success',
    Error = 'error',
}

const setResponseType = (status: ResponseStatus) => {
    document.body.setAttribute('data-hub', status);
    document.body.setAttribute('data-document', status);
};

const restHandlers = [
    rest.get(
        `${window.location.origin}/api/hub/settings/${ResponseStatus.Success}/${ResponseStatus.Success}`,
        (req, res, ctx) => {
            const response: DesignTokenApiResponse = {
                hub: {
                    appearance: {
                        heading1: {
                            family: 'Arial',
                            weight: 'bold',
                            size: '24px',
                        },
                    },
                },
            };
            return res(ctx.status(200), ctx.json(response));
        }
    ),

    rest.get(
        `${window.location.origin}/api/hub/settings/${ResponseStatus.Error}/${ResponseStatus.Error}`,
        (req, res, ctx) => {
            return res(ctx.status(400), ctx.json({}));
        }
    ),
];

const server = setupServer(...restHandlers);

/**
 * @vitest-environment happy-dom
 */
describe('useGuidelineDesignTokens', () => {
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

    it('should set design tokens on successfull api call', async () => {
        setResponseType(ResponseStatus.Success);

        const { result, waitForNextUpdate } = renderHook(() => useGuidelineDesignTokens());
        await waitForNextUpdate();

        expect(result.current).toMatchObject({
            designTokens: {
                heading1: { fontFamily: 'Arial', fontWeight: 'bold', fontSize: '24px' },
            },
            error: null,
            isLoading: false,
        });
    });

    it('should set the state to loading and ready', async () => {
        setResponseType(ResponseStatus.Success);

        const { result, waitForNextUpdate } = renderHook(() => useGuidelineDesignTokens());
        expect(result.current.isLoading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.isLoading).toBe(false);
    });

    it('should set error on bad api request', async () => {
        setResponseType(ResponseStatus.Error);

        const { result, waitForNextUpdate } = renderHook(() => useGuidelineDesignTokens());
        await waitForNextUpdate();
        expect(result.current.error).toMatch(/Bad Request/);
    });

    it('should update on HubAppearanceUpdated', async () => {
        setResponseType(ResponseStatus.Success);

        const { result, waitForNextUpdate } = renderHook(() => useGuidelineDesignTokens());
        await waitForNextUpdate();
        window.emitter.emit('HubAppearanceUpdated', {
            appearance: { heading1: { family: 'family' } },
        });

        expect(result.current).toMatchObject({
            designTokens: { heading1: { fontFamily: 'family' } },
            error: null,
            isLoading: false,
        });
    });

    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());
});
