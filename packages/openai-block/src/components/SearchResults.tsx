/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SearchData } from '../OpenAiBlock';
import { SearchError } from './SearchError';
import { AnimatePresence, motion } from 'framer-motion';

type SearchResultProps = {
    searchData: SearchData;
    index: number;
    shouldAnimateResult: boolean;
};

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.5,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
};

export const SearchResult = ({ searchData, index, shouldAnimateResult }: SearchResultProps) => {
    return (
        <div className="tw-text-l tw-max-h-[400px]">
            {searchData.error ? (
                <SearchError error={searchData.error} />
            ) : (
                <AnimatePresence initial={shouldAnimateResult} key={index}>
                    <motion.ul variants={container} initial="hidden" animate="show">
                        <motion.li variants={item} className="tw-font-bold">
                            Your Question: {searchData.query}
                        </motion.li>
                        {searchData.result?.map((paragraph) => (
                            <motion.li variants={item} key={paragraph} className="tw-text-text-weak">
                                {paragraph}
                            </motion.li>
                        ))}
                    </motion.ul>
                </AnimatePresence>
            )}
        </div>
    );
};
