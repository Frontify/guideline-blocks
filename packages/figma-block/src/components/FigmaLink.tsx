/* (c) Copyright Frontify Ltd., all rights reserved. */

import { THEME_PREFIX } from '@frontify/guideline-blocks-settings';

type FigmaLinkProps = {
    assetExternalUrl: string;
    title: string | undefined;
};

export const FigmaLink = ({ assetExternalUrl, title }: FigmaLinkProps) => (
    <div className="tw-p-2 tw-text-sm">
        <a
            href={assetExternalUrl}
            target="_blank"
            rel="noreferrer"
            style={{
                color: `var(${THEME_PREFIX}link-color)`,
                textDecoration: `var(${THEME_PREFIX}link-text-decoration)`,
            }}
        >
            {title}
        </a>
    </div>
);
