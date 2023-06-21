/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, IconArrowLeft16, IconArrowRight16, TextInput, Validation } from '@frontify/fondue';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { ControlButton, EmptySearchResults, SearchResult } from './components';
import 'tailwindcss/tailwind.css';
import { cosineSimilarity, getWordCount, splitText } from './helper';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from './const-private';
import { mergeDeep, useBlockSettings } from '@frontify/app-bridge';
import { DEFAULT_VALUES, Settings } from './settings';

export type SearchData = { query: string; result: Result | null; error: string | null };

export type Result = string[];

const openAiConfiguration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(openAiConfiguration);

export const OpenAiBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [searches, setSearches] = useState<SearchData[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentSearchIndex, setCurrentSearchIndex] = useState<number>(0);
    const [navigationMode, setNavigationMode] = useState<'current' | 'history'>('current');
    const [pageEmbeddings, setPageEmbeddings] = useState<{ text: string; embedding: number[] }[]>([]);
    const [questionEmbedding, setQuestionEmbedding] = useState<{ text: string; embedding: number[] }>();

    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    // mergeDeep required because blockSetting defaults don't seem to be applied
    const {
        isPersonalityCustom,
        personalityChoice,
        personalityCustom,
        showHistory,
        isAnimationEnabled,
        animationSpeed,
    } = mergeDeep<Settings>(DEFAULT_VALUES, blockSettings);
    const chatPersonality = isPersonalityCustom ? personalityCustom : personalityChoice;

    const blockId = appBridge.getBlockId();

    const TEXT_ID = `${blockId}-open-ai-input`;

    const handleSubmit = useCallback(async () => {
        if (inputValue === '') {
            return;
        }
        setIsLoading(true);

        const questionEmbeddingResponse = await openai.createEmbedding({
            input: inputValue,
            model: 'text-embedding-ada-002',
        });

        const _questionEmbedding = questionEmbeddingResponse.data.data[0].embedding;
        setQuestionEmbedding({ text: inputValue, embedding: _questionEmbedding });
    }, [inputValue]);

    const handlePrev = useCallback(() => {
        setCurrentSearchIndex((curr) => curr - 1);
        setNavigationMode('history');
    }, []);

    const handleNext = useCallback(() => {
        setCurrentSearchIndex((curr) => curr + 1);
        setNavigationMode('history');
    }, []);

    const currentSearch = searches[currentSearchIndex];

    const getTextFromBlocks = () => {
        const newSplitTexts = [];
        let textInProgress = '';
        let wordCountOfTextInProgress = 0;
        const blocks = Array.from(document.querySelectorAll('.block')) as HTMLDivElement[];
        for (const block of blocks) {
            const wordCountOfBlockToAdd = getWordCount(block.innerText);
            if (wordCountOfTextInProgress + wordCountOfBlockToAdd < 500) {
                textInProgress += `\n\n${block.innerText}`;
                wordCountOfTextInProgress += wordCountOfBlockToAdd;
            } else {
                newSplitTexts.push(textInProgress);
                if (wordCountOfBlockToAdd > 500) {
                    const subpartsOfBlock = splitText(block.innerText, 500);
                    for (const part of subpartsOfBlock) {
                        newSplitTexts.push(part);
                    }
                    textInProgress = '';
                    wordCountOfTextInProgress = 0;
                } else {
                    textInProgress = block.innerText;
                    wordCountOfTextInProgress = wordCountOfBlockToAdd;
                }
            }
        }
        if (textInProgress) {
            newSplitTexts.push(textInProgress);
        }
        return newSplitTexts;
    };

    const createPageEmbeddings = async () => {
        if (pageEmbeddings.length > 0) {
            return;
        }

        const splitTexts = getTextFromBlocks();
        const embeddingResponse = await openai.createEmbedding({
            input: splitTexts,
            model: 'text-embedding-ada-002',
        });
        const _pageEmbeddings = embeddingResponse.data.data.map((embedding, i) => ({
            text: splitTexts[i],
            embedding: embedding.embedding,
        }));
        setPageEmbeddings(_pageEmbeddings);
    };

    useEffect(() => {
        if (pageEmbeddings.length === 0 || !questionEmbedding) {
            return;
        }
        const generateAnswer = async () => {
            const similarities = pageEmbeddings
                .map((pageEmbedding) => ({
                    text: pageEmbedding.text,
                    similarity: cosineSimilarity(questionEmbedding.embedding, pageEmbedding.embedding),
                }))
                .sort((a, b) => b.similarity - a.similarity);

            const topSimilarity = similarities.slice(0, Math.min(2, similarities.length));
            const chatGPTResponse = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                temperature: 1,
                max_tokens: 500,
                messages: [
                    {
                        role: 'system',
                        content: `Answer all prompts as if you are a ${chatPersonality}`,
                    },
                    {
                        role: 'user',
                        content: `Only use the provided context to generate the answer, nothing else. Do not mention that there is a provided context. Do not add extra information to the context. Do not use your own trained data to add to the context. Do not try to justify your answers. If the answer is not in the context, strictly say "Sorry, I could not find any information on that.". If the question is not a question, or does not make sense, just respons with "Sorry, I could not find any information on that.". Make sure the answer is less than 300 words. Provided context to use: ${topSimilarity
                            .map((similarity) => similarity.text)
                            .join('\n\n')}.

                            To answer my question please only and only use informations in the provided context above.
                        My question: ${questionEmbedding.text}`,
                    },
                ],
            });

            try {
                setSearches([
                    ...searches,
                    {
                        query: questionEmbedding.text,
                        result: [chatGPTResponse.data.choices[0].message?.content || ''],
                        error: null,
                    },
                ]);
            } catch (error) {
                setSearches([
                    ...searches,
                    { query: questionEmbedding.text, result: null, error: 'Unable to answer question at this time' },
                ]);
            }
            setInputValue('');
            setQuestionEmbedding(undefined);
            setIsLoading(false);
            // Reset search index to latest
            setCurrentSearchIndex(searches.length);
            setNavigationMode('current');
        };
        generateAnswer();
    }, [pageEmbeddings, questionEmbedding, searches, chatPersonality]);

    return (
        <div data-test-id="openai-block" className="tw-flex tw-flex-col tw-gap-y-6">
            <div onFocus={createPageEmbeddings} className="tw-flex tw-gap-2">
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

            {searches.length > 0 ? (
                <SearchResult
                    index={currentSearchIndex}
                    searchData={currentSearch}
                    shouldAnimateResult={navigationMode === 'current' && isAnimationEnabled}
                    animationSpeed={parseInt(animationSpeed)}
                />
            ) : (
                <EmptySearchResults />
            )}
            {searches.length > 1 && showHistory && (
                <div className="tw-flex tw-justify-between">
                    {currentSearchIndex > 0 ? (
                        <ControlButton onClick={handlePrev}>
                            <IconArrowLeft16 /> Previous Question
                        </ControlButton>
                    ) : (
                        <div />
                    )}
                    {currentSearchIndex < searches.length - 1 && (
                        <ControlButton onClick={handleNext}>
                            Next Question
                            <IconArrowRight16 />
                        </ControlButton>
                    )}
                </div>
            )}
        </div>
    );
};
