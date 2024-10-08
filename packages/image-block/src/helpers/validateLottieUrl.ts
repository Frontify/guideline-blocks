/* (c) Copyright Frontify Ltd., all rights reserved. */

export async function validateLottieUrl(
    url: string
): Promise<{ isValid: boolean; validatedUrl: string; errorMessage?: string }> {
    url = url.trim();

    if (!url.startsWith('https://lottie.host') && !url.startsWith('lottie.host')) {
        return {
            isValid: false,
            validatedUrl: url,
            // errorMessage: 'URL must start with https://lottie.host or lottie.host',
            errorMessage: 'Please enter a valid Lottie url',
        };
    }

    if (url.startsWith('lottie.host')) {
        url = `https://${url}`;
    }

    if (!url.endsWith('.json') && !url.endsWith('.lottie')) {
        return {
            isValid: false,
            validatedUrl: url,
            // errorMessage: 'URL must end with .json or .lottie',
            errorMessage: 'Please enter a valid Lottie URL',
        };
    }

    // Check server
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json, application/octet-stream',
            },
        });
        if (!response.ok) {
            return {
                isValid: false,
                validatedUrl: url,
                // errorMessage: `Server returned status ${response.status}: ${response.statusText}`,
                errorMessage: "Something went wrong! We're having trouble connecting to the server",
            };
        }
    } catch (error) {
        return {
            isValid: false,
            validatedUrl: url,
            // errorMessage: `Unable to connect to the server: ${(error as Error).message}`,
            errorMessage: "Something went wrong! We're having trouble connecting to the server",
        };
    }

    return {
        isValid: true,
        validatedUrl: url,
    };
}
