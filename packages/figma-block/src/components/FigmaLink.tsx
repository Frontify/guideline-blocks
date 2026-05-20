/* (c) Copyright Frontify Ltd., all rights reserved. */

type FigmaLinkProps = {
    assetExternalUrl: string;
    title: string | undefined;
};

export const FigmaLink = ({ assetExternalUrl, title }: FigmaLinkProps) => (
    <div className="tw-p-2 tw-text-sm">
        <a href={assetExternalUrl} target="_blank" rel="noreferrer" className="tw-text-[#4a90e2]">
            {title}
        </a>
    </div>
);
