/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useDocuments } from '@frontify/app-bridge';
import { IconColorFan, TreeItem, merge } from '@frontify/fondue';
import React from 'react';
import { ReactElement } from 'react';

type DocumentLinksProps = {
    appBridge: AppBridgeBlock;
};

type DocumentLinkProps = {
    icon: ReactElement;
    title: string;
    isActive: boolean;
};

const DocumentLink = ({ icon, title, isActive }: DocumentLinkProps) => {
    return (
        <>
            <span className="tw-ml-1">{icon}</span>
            <span className="tw-text-s">{title}</span>
            <span
                className={merge([
                    'tw-flex-auto tw-font-sans tw-text-xs tw-text-right',
                    !isActive && 'tw-text-text-weak',
                    isActive && 'tw-text-text-white',
                ])}
            >
                {title}
            </span>
        </>
    );
};

export const DocumentLinks = ({ appBridge }: DocumentLinksProps): ReactElement => {
    const { documents } = useDocuments(appBridge as any);
    console.log('foo', documents);

    return (
        <>
            {
                // eslint-disable-next-line unicorn/no-array-for-each
                documents.forEach((document, key) => {
                    console.log('document', document);
                    return (
                        <TreeItem
                            key={key}
                            id={document.id.toString()}
                            contentComponent={() => (
                                <DocumentLink
                                    key={document.id}
                                    icon={<IconColorFan />}
                                    title={document.title}
                                    isActive={false}
                                />
                            )}
                            level={0}
                        ></TreeItem>
                    );
                })
            }
        </>
    );
};
