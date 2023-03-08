/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FrontifyHttpClientError } from './FrontifyHttpClientErrors';

type HttpMethod = 'GET' | 'POST';
type RequestOptions = {
    method: string;
    headers: RequestHeaders;
    body?: string;
};
export type RequestHeaders = {
    'X-CSRF-TOKEN'?: string;
    'Content-Type'?: string;
    Authorization?: string;
};
type FrontifyEndpointResponse<T> = {
    data: T;
    success: boolean;
};
type HttpUtilResponse<T> = {
    result: FrontifyEndpointResponse<T>;
};

let csrfToken = '';

const getCsrfToken = (): string => {
    if (!csrfToken) {
        const tokenElement = document.getElementsByName('x-csrf-token');

        if (tokenElement.length > 0) {
            csrfToken = (tokenElement[0] as HTMLMetaElement).content;
        }
    }

    return csrfToken;
};

export const getHeaders = () => {
    const X_CSRF_TOKEN = getCsrfToken();
    const CONTENT_TYPE = 'application/json; charset=utf-8';

    return {
        'Content-Type': CONTENT_TYPE,
        ...(X_CSRF_TOKEN ? { 'X-CSRF-TOKEN': X_CSRF_TOKEN } : {}),
    };
};

const request = async <T>(
    method: HttpMethod,
    url: string,
    data?: Record<never, never>,
    headers?: RequestHeaders
): Promise<HttpUtilResponse<T>> => {
    const parameters: RequestOptions = {
        method,
        headers: {
            ...getHeaders(),
            ...headers,
        },
        ...(data && { body: JSON.stringify(data) }),
    };

    const apiResponse = await fetch(url, parameters);
    const apiResponseJson = await apiResponse.json();

    if (!apiResponse.ok) {
        throw new FrontifyHttpClientError(apiResponseJson, apiResponse.status, apiResponseJson.error);
    }

    return {
        result: apiResponseJson as FrontifyEndpointResponse<T>,
    };
};

type DefaultFrontifyHttpResponse = Record<string, unknown>;

export class FrontifyHttpClient {
    static async get<T = DefaultFrontifyHttpResponse>(
        url: string,
        headers?: RequestHeaders
    ): Promise<HttpUtilResponse<T>> {
        return request<T>('GET', url, '', headers);
    }

    static async post<T = DefaultFrontifyHttpResponse>(
        url: string,
        data?: Record<never, never>,
        headers?: RequestHeaders
    ): Promise<HttpUtilResponse<T>> {
        return request<T>('POST', url, data, headers);
    }
}
