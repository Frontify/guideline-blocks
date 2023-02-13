import type { FC } from 'react';
import { useBlockAssets } from '@frontify/app-bridge';
import type { BlockProps } from '@frontify/guideline-blocks-settings';

export const AnExampleBlock: FC<BlockProps> = ({ appBridge }) => {
    const { blockAssets } = useBlockAssets(appBridge);

    const getFirstImageUrl = () => (blockAssets?.firstImage ? blockAssets.firstImage[0].previewUrl : '');

    return <img src={getFirstImageUrl()} alt="blah" />;
};
