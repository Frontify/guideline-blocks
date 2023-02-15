/* (c) Copyright Frontify Ltd., all rights reserved. */

export class FrontifyHttpClientError extends Error {
    public code = 0;
    public responseBody: object;

    constructor(message: string, code: number, responseBody: Record<string, unknown>) {
        super(`Status code ${code} - ${message}`);
        this.name = 'FrontifyHttpClientError';
        this.code = code;
        this.responseBody = responseBody;
    }
}
