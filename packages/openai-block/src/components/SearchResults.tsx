/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SearchData } from '../OpenAiBlock';
import { SearchError } from './SearchError';

type SearchResultProps = {
    searchData: SearchData;
};

export const SearchResult = ({ searchData }: SearchResultProps) => {
    return (
        <div className="tw-text-l tw-max-h-[400px]">
            {searchData.error ? (
                <SearchError error={searchData.error} />
            ) : (
                <>
                    <div className="tw-font-bold">Your Question: {searchData.query}</div>
                    <div className="tw-text-text-weak">
                        {searchData.result?.map((paragraph) => (
                            <div key={paragraph}>{paragraph}</div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
