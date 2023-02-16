/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FrontifyHttpClient } from '../utility';
import {
    GenerateBulkDownloadRequest,
    GenerateBulkDownloadData,
    GenerateBulkDownloadTokenRequest,
    GenerateBulkDownloadTokenData,
} from '../types';

const postGenerateBulkDownloadToken = async (
    projectId: number,
    data: GenerateBulkDownloadTokenRequest
): Promise<GenerateBulkDownloadTokenData> => {
    const { result } = await FrontifyHttpClient.post<GenerateBulkDownloadTokenData>(
        `/api/project/${projectId}/bulk-download-token`,
        data
    );
    return result.data;
};

const postGenerateBulkDownloadRequest = async (
    data: GenerateBulkDownloadRequest
): Promise<GenerateBulkDownloadData> => {
    const { result } = await FrontifyHttpClient.post<GenerateBulkDownloadData>('/api/bulk-download', data);
    return result.data;
};


const getBulkDownloadStatus = async (
    token: string
): Promise<GenerateBulkDownloadData> => {
    return await new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            try {
                const { result } = await FrontifyHttpClient.get<GenerateBulkDownloadData>(`/api/bulk-download/${token}`);

                if (result?.data?.download_url) {
                    clearInterval(interval);
                    resolve(result.data);
                }
            } catch (error) {
                clearInterval(interval);
                reject(error)
            }
        }, 2500);
    });
};



export const generateBulkDownloadRequest = (projectId: number, data: GenerateBulkDownloadTokenRequest) => {
    (async () => {
        const responseToken: GenerateBulkDownloadTokenData = await postGenerateBulkDownloadToken(
            projectId,
            data
        );

        let token = responseToken.token ?? '';

        const dataRequest: GenerateBulkDownloadRequest = {
            token,
        };

        const downloadResponse: GenerateBulkDownloadData = await postGenerateBulkDownloadRequest(dataRequest);

        const result = await getBulkDownloadStatus(downloadResponse.signature);
        window.open(result.download_url, '_self');

    })();
};
