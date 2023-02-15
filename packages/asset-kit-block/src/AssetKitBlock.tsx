/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { FC, useState } from 'react';
import 'tailwindcss/tailwind.css';
import {
    postGenerateBulkDownloadToken,
    postGenerateBulkDownloadRequest,
    getBulkDownloadStatus,
} from './repository/BulkDownloadRepository';
import { Button, ButtonEmphasis, IconSize, IconTrashBin } from '@frontify/fondue';

import {
    GenerateBulkDownloadData,
    GenerateBulkDownloadRequest,
    GenerateBulkDownloadTokenRequest,
    GenerateBulkDownloadTokenResponse,
} from './types';

export const AssetKitBlock: FC<BlockProps> = ({ appBridge }) => {
    let token = '';

    appBridge.getProjectId(); // project id
    // to get the asset ids refeer to the documentation
    const data: GenerateBulkDownloadTokenRequest = {
        asset_ids: [1, 2, 3],
        set_ids: [],
        language: 'en',
    };

    const generateBulkDownload = () => {
        (async () => {
            let responseToken: GenerateBulkDownloadTokenResponse = await postGenerateBulkDownloadToken(
                appBridge.getProjectId(),
                data
            );
            token = responseToken.token ?? '';
            console.log(responseToken);

            let dataRequest: GenerateBulkDownloadRequest = {
                token: token,
            };

            let downloadResponse: GenerateBulkDownloadData = await postGenerateBulkDownloadRequest(dataRequest);
            console.log(downloadResponse);

            let pingReponse: GenerateBulkDownloadData = await getBulkDownloadStatus(downloadResponse.signature);
            console.log(pingReponse);
        })();
    };

    return (
        <div data-test-id="example-block">
            <span className="tw-text-violet-60 tw-underline">Token</span>
            <Button
                icon={<IconTrashBin size={IconSize.Size20} />}
                emphasis={ButtonEmphasis.Default}
                onClick={generateBulkDownload}
            />
        </div>
    );
};
