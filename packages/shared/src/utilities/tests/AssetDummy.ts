/* (c) Copyright Frontify Ltd., all rights reserved. */
import { Asset } from '@frontify/app-bridge';

export class AssetDummy {
    static with(id: number): Asset {
        return {
            id,
            filename: `asset-${id}`,
            creator_name: 'Frontify',
            ext: 'jpg',
            file_id: `an_random_file_id_${id}`,
            height: 1080,
            width: 1920,
            object_type: 'ASSET',
            generic_url: 'https://picsum.photos/1920/1080',
            preview_url: 'https://picsum.photos/1920/1080',
            project_id: 123,
            name: `Asset ${id}`,
        };
    }
}
