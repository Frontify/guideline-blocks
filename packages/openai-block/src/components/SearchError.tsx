/* (c) Copyright Frontify Ltd., all rights reserved. */

type SearchErrorProps = { error: string };

export const SearchError = ({ error }: SearchErrorProps) => (
    <div className="tw-text-text-negative tw-text-xxl">There was an error with your request: {error}</div>
);
