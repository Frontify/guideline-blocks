/* (c) Copyright Frontify Ltd., all rights reserved. */

const getCsrfToken = (): string => {
    const tokenElement = document.getElementsByName('x-csrf-token');
    return (tokenElement[0] as HTMLMetaElement).content;
};

export const queryGraphql = async (uploadBody: string) => {
    try {
        const response = await fetch(`${window.location.origin}/graphql-internal`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken(),
                'X-Frontify-Development-Flags': 'PUBLIC_API_ASSET_SUBMISSION',
            },
            body: uploadBody,
        });

        return await response.json();
    } catch (error) {
        console.warn(error);
    }
};
