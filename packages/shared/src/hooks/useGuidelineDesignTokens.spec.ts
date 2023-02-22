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
    EmptyValues = 'emptyValues',
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
        `${window.location.origin}/api/hub/settings/${ResponseStatus.EmptyValues}/${ResponseStatus.EmptyValues}`,
        (req, res, ctx) => {
            const response: DesignTokenApiResponse = {
                hub: {
                    appearance: {
                        heading1: {},
                        heading2: {},
                        heading3: {},
                        heading4: {},
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

    it('should set default design tokens on api call with empty return values', async () => {
        setResponseType(ResponseStatus.EmptyValues);

        const { result, waitForNextUpdate } = renderHook(() => useGuidelineDesignTokens());
        await waitForNextUpdate();

        expect(result.current).toMatchObject({
            designTokens: {
                heading1: {
                    fontFamily: 'inherit',
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    fontSize: '30px',
                    color: 'rgba(0,0,0,1)',
                    letterSpacing: 'normal',
                    lineHeight: '1.3',
                    marginTop: '0',
                    marginBottom: '10px',
                    textDecoration: 'none',
                },
                heading2: {
                    fontFamily: 'inherit',
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    fontSize: '22px',
                    color: 'rgba(0,0,0,1)',
                    letterSpacing: 'normal',
                    lineHeight: '1.3',
                    marginTop: '0',
                    marginBottom: '10px',
                    textDecoration: 'none',
                },
                heading3: {
                    fontFamily: 'inherit',
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    fontSize: '18px',
                    color: 'rgba(0,0,0,1)',
                    letterSpacing: 'normal',
                    lineHeight: '1.3',
                    marginTop: '0',
                    marginBottom: '10px',
                    textDecoration: 'none',
                },
                heading4: {
                    fontFamily: 'inherit',
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    fontSize: '16px',
                    color: 'rgba(0,0,0,1)',
                    letterSpacing: 'normal',
                    lineHeight: '1.3',
                    marginTop: '0',
                    marginBottom: '10px',
                    textDecoration: 'none',
                },
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
