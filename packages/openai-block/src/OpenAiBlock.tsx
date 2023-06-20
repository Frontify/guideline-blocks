/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, IconArrowLeft16, IconArrowRight16, TextInput, Validation } from '@frontify/fondue';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { ReactElement, useCallback, useState } from 'react';
import { ControlButton, EmptySearchResults, SearchResult } from './components';
import 'tailwindcss/tailwind.css';

export type SearchData = { query: string; result: Result | null; error: string | null };

export type Result = string[];

export const OpenAiBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [searches, setSearches] = useState<SearchData[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentSearchIndex, setCurrentSearchIndex] = useState<number>(0);

    const blockId = appBridge.getBlockId();

    const TEXT_ID = `${blockId}-open-ai-input`;

    const doTheApiThings = useCallback(async (inputValue: string): Promise<Result> => {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve([`Your result has been processed for input: ${inputValue}`]);
            }, 500)
        );
    }, []);

    const handleSubmit = useCallback(async () => {
        if (inputValue === '') {
            return;
        }
        setIsLoading(true);
        try {
            const result = await doTheApiThings(inputValue);
            setSearches([...searches, { query: inputValue, result, error: null }]);
        } catch (error) {
            setSearches([
                ...searches,
                { query: inputValue, result: null, error: 'Unable to answer question at this time' },
            ]);
        }
        setInputValue('');
        setIsLoading(false);
        // Reset search index to latest
        setCurrentSearchIndex(searches.length);
    }, [doTheApiThings, inputValue, searches]);

    const currentSearch = searches[currentSearchIndex];

    return (
        <div data-test-id="openai-block" className="tw-flex tw-flex-col tw-gap-y-6">
            <div className="tw-flex tw-gap-2">
                <TextInput
                    id={TEXT_ID}
                    placeholder="Ask me anything about this page..."
                    size={100}
                    onEnterPressed={handleSubmit}
                    value={inputValue}
                    onChange={setInputValue}
                    disabled={isLoading}
                    validation={isLoading ? Validation.Loading : Validation.Default}
                />
                <Button onClick={handleSubmit} disabled={inputValue === '' || isLoading}>
                    Submit
                </Button>
            </div>

            {searches.length > 0 ? <SearchResult searchData={currentSearch} /> : <EmptySearchResults />}
            {searches.length > 1 && (
                <div className="tw-flex tw-justify-between ">
                    {currentSearchIndex > 0 && (
                        <ControlButton onClick={() => setCurrentSearchIndex((curr) => curr - 1)}>
                            <IconArrowLeft16 /> Previous Question
                        </ControlButton>
                    )}
                    {currentSearchIndex < searches.length - 1 && (
                        <ControlButton onClick={() => setCurrentSearchIndex((curr) => curr + 1)}>
                            Next Question
                            <IconArrowRight16 />
                        </ControlButton>
                    )}
                </div>
            )}
        </div>
    );
};
