/* eslint-disable unicorn/no-nested-ternary */
/* (c) Copyright Frontify Ltd., all rights reserved. */

export async function validateLottieUrl(
    input: string
): Promise<{ isValid: boolean; validatedUrl: string; errorMessage?: string }> {
    // if the input contains a <dotlottie-player> tag
    const dotlottieMatch = input.match(/<dotlottie-player[^>]*src=["'](.+?)["'][^>]*>/);
    const iframeMatch = input.match(/<iframe[^>]*src=["'](.+?)["'][^>]*>/);
    const urlString = dotlottieMatch ? dotlottieMatch[1].trim() : iframeMatch ? iframeMatch[1].trim() : input.trim();

    let url: URL;
    try {
        url = new URL(urlString);

        // prepend https if no protocol
        if (!url.protocol) {
            url = new URL(`https://${urlString}`);
        }

        // Remove '/embed' if present
        url.pathname = url.pathname.replace(/^\/embed\//, '/');

        // Check if hostname is lottie.host
        if (url.hostname !== 'lottie.host') {
            return {
                isValid: false,
                validatedUrl: url.toString(),
                // errorMessage: 'URL must be from lottie.host',
                errorMessage: 'Please enter a valid LottieFiles URL',
            };
        }

        // Check if the URL ends with '.json' or '.lottie'
        if (!url.pathname.endsWith('.json') && !url.pathname.endsWith('.lottie')) {
            return {
                isValid: false,
                validatedUrl: url.toString(),
                // errorMessage: 'URL must end with .json or .lottie',
                errorMessage: 'Please enter a valid LottieFiles URL',
            };
        }
    } catch (error) {
        return {
            isValid: false,
            validatedUrl: urlString,
            // errorMessage: `Invalid URL: ${(error as Error).message}`,
            errorMessage: 'Please enter a valid LottieFiles URL',
        };
    }

    // Determine expected content type from file extension
    const expectedContentType = url.pathname.endsWith('.json') ? 'application/json' : 'application/octet-stream';

    // Check if the server is working and the file exists
    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                Accept: 'application/json, application/octet-stream',
            },
        });

        if (!response.ok) {
            console.error(`Server response not OK. Status: ${response.status}, StatusText: ${response.statusText}`);
            return {
                isValid: false,
                validatedUrl: url.toString(),
                // errorMessage: `Server returned status ${response.status}: ${response.statusText}`,
                errorMessage: "Something went wrong! We're having trouble connecting to LottieFiles",
            };
        }

        // Check if the response content type matches the expected type
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes(expectedContentType)) {
            console.error(`Invalid content type. Expected ${expectedContentType}, got: ${contentType}`);
            return {
                isValid: false,
                validatedUrl: url.toString(),
                // errorMessage: `The URL does not point to a valid Lottie ${url.pathname.endsWith('.json') ? 'JSON' : 'dotlottie'} file`,
                errorMessage: "Something went wrong! We're having trouble connecting to LottieFiles",
            };
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        return {
            isValid: false,
            validatedUrl: url.toString(),
            // errorMessage: `Unable to connect to the server or parse the response: ${(error as Error).message}`,
            errorMessage: "Something went wrong! We're having trouble connecting to LottieFiles",
        };
    }

    return {
        isValid: true,
        validatedUrl: url.toString(),
    };
}
