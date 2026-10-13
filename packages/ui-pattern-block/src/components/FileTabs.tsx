/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames } from '@frontify/guideline-blocks-settings';
import { type KeyboardEvent, type ReactElement, useRef } from 'react';

import { getFileTabId } from '../helpers';
import { type ToolbarTab } from '../types';

interface Props {
    tabs: ToolbarTab[];
    activeFile: string;
    tabsId: string;
    panelId: string;
    onSelect: (file: string) => void;
}

const getNextIndex = (key: string, index: number, lastIndex: number): number | undefined => {
    switch (key) {
        case 'ArrowRight': {
            return index === lastIndex ? 0 : index + 1;
        }
        case 'ArrowLeft': {
            return index === 0 ? lastIndex : index - 1;
        }
        case 'Home': {
            return 0;
        }
        case 'End': {
            return lastIndex;
        }
        default: {
            return undefined;
        }
    }
};

export const FileTabs = ({ tabs, activeFile, tabsId, panelId, onSelect }: Props): ReactElement => {
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }
        const nextIndex = getNextIndex(event.key, index, tabs.length - 1);
        if (nextIndex === undefined) {
            return;
        }
        event.preventDefault();
        onSelect(tabs[nextIndex].file);
        tabsRef.current[nextIndex]?.focus();
    };

    return (
        <div role="tablist" aria-label="Code files" className="tw-flex tw-h-full">
            {tabs.map(({ file, label }, index) => {
                const isSelected = file === activeFile;
                return (
                    <button
                        ref={(element) => {
                            tabsRef.current[index] = element;
                        }}
                        key={file}
                        id={getFileTabId(tabsId, file)}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-controls={panelId}
                        data-test-id="toolbar-tab-btn"
                        className={joinClassNames([
                            'tw-px-2 tw-h-full tw-text-small tw-font-primary tw-relative focus-visible:tw-z-20 focus-visible:tw-ring-4 focus-visible:tw-ring-blue focus-visible:tw-ring-offset-2 focus-visible:dark:tw-ring-offset-black focus-visible:tw-outline-none',
                            isSelected ? 'tw-text-primary tw-font-medium' : 'tw-text-secondary hover:tw-text-primary',
                        ])}
                        onClick={() => onSelect(file)}
                        onKeyDown={(event) => onKeyDown(event, index)}
                    >
                        {/* Hidden bold copy reserves width so selecting doesn't shift the layout */}
                        <span className="tw-grid">
                            <span className="tw-col-start-1 tw-row-start-1">{label}</span>
                            <span
                                aria-hidden="true"
                                className="tw-col-start-1 tw-row-start-1 tw-invisible tw-font-medium"
                            >
                                {label}
                            </span>
                        </span>
                        {isSelected && (
                            <span className="tw-w-full tw-h-0.5 tw-absolute tw-bottom-0 tw-left-0 tw-bg-[#2180EF]" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};
